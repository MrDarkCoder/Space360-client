import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { take } from 'rxjs';
import { utc } from 'moment';

import { User, UserRespone } from 'src/app/models/users/User';
import { MembersService } from 'src/app/services/members.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { SpaceService } from 'src/app/services/space.service';
import { TeamService } from 'src/app/services/team.service';
import { Router } from '@angular/router';
import { SubTeam } from 'src/app/models/forms/SubTeam';
import { Space } from 'src/app/models/space/space';
import { ReservationTimings } from 'src/app/models/reservations/reservation';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.scss'],
})
export class UserReservationComponent implements OnInit {
  reservationForm: FormGroup;
  currentUser: User;

  utc = utc;

  minTime: Date = new Date();
  maxTime: Date = new Date();
  startsTime: Date = new Date();

  subTeams: SubTeam[];
  teamMembers: UserRespone[];
  filteredTeammembers: UserRespone[];
  spaceCategory: any;
  spaces: Space[];
  reservations:ReservationTimings[] = [];

  isSpaceAvailable = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private memberService: MembersService,
    private teamService: TeamService,
    private spaceService: SpaceService,
    private reservationService: ReservationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Default starts At
    // this.startsTime.setHours(9);
    // this.startsTime.setMinutes(0);

    // max Time
    this.maxTime.setHours(24);
    this.maxTime.setMinutes(0);

    // min Time
    this.minTime.setHours(9);
    this.minTime.setMinutes(0);

    // Current User
    this.memberService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.currentUser = user));

    // Init Form
    this.initializeForm();

    // getting space category
    this.getSpaceCategory();

    // getting subteams
    this.getSubTeamsByMainTeamId();

    // getting team members
    this.getTeamMembers();
  }

  initializeForm() {
    this.reservationForm = this.fb.group({
      reservedTeamId: [this.currentUser.userTeamId, Validators.required],
      reservedSubTeamId: [this.currentUser.userSubTeamId, Validators.required],
      selection: ['', Validators.required],
      spaceCategoryId: [0, Validators.required],
      reservedSpaceId: [0, Validators.required],
      reservationTitle: ['', Validators.required],
      reservedByUserId: [this.currentUser.userId, Validators.required],
      reservedUsers: [[], Validators.required],
      isMainTeamOnly: [false, Validators.required],
      isSubTeamOnly: [false, Validators.required],
      isIndividualOnly: [false, Validators.required],
      startsAt: [this.startsTime, Validators.required],
      duration: [0, Validators.required],
    });
    this.reservationForm.controls['reservedSubTeamId'].disable();
    this.reservationForm.controls['reservedUsers'].disable();
  }

  //Disabling fields based on selection
  getSelection(id: string) {
    if (id == 'subteam') {
      this.reservationForm.controls['reservedSubTeamId'].enable();
      this.reservationForm.controls['reservedUsers'].disable();

      //Setting boolean values to form control
      this.reservationForm.controls['isSubTeamOnly'].setValue(true);
      this.reservationForm.controls['isIndividualOnly'].setValue(false);
      this.reservationForm.controls['isMainTeamOnly'].setValue(false);
    } else if (id == 'individual') {
      this.reservationForm.controls['reservedSubTeamId'].disable();
      this.reservationForm.controls['reservedUsers'].enable();

      //Setting boolean values to form control
      this.reservationForm.controls['isIndividualOnly'].setValue(true);
      this.reservationForm.controls['isSubTeamOnly'].setValue(false);
      this.reservationForm.controls['isMainTeamOnly'].setValue(false);
    } else if (id == 'fullteam') {
      this.reservationForm.controls['reservedSubTeamId'].disable();
      this.reservationForm.controls['reservedUsers'].disable();

      //Setting boolean values to form control
      this.reservationForm.controls['isMainTeamOnly'].setValue(true);
      this.reservationForm.controls['isIndividualOnly'].setValue(false);
      this.reservationForm.controls['isSubTeamOnly'].setValue(false);
    }
  }

  //To filter team members

  filterTeamMembers(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.teamMembers.length; i++) {
      let member = this.teamMembers[i];
      if (member.username.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(member);
      }
    }
    this.filteredTeammembers = filtered;
  }

  //To get Sub Teams by Main Team Id
  getSubTeamsByMainTeamId() {
    this.teamService.getSubTeams(this.currentUser.userTeamId).subscribe({
      next: (response) => {
        this.subTeams = response;
      },
    });
  }

  //To get Space Category
  getSpaceCategory() {
    this.spaceService.getSpaceCategory().subscribe({
      next: (response) => {
        this.spaceCategory = response;
      },
    });
  }

  //Executed when value selections in the space category dropdown
  changeCategory(event: any) {
    this.reservationForm.get('spaceCategoryId').setValue(event.target.value, {
      onlySelf: true,
    });
    this.getSpaceByCategory(this.reservationForm.value.spaceCategoryId);
  }

  //Executed when value selections in the space  dropdown
  changeSpace(event: any) {
    this.reservationForm.get('reservedSpaceId').setValue(event.target.value, {
      onlySelf: true,
    });
    this.getReservedTimingsOfSpace(this.reservationForm.value.reservedSpaceId);
  }

  //To get space by category
  getSpaceByCategory(id: number) {
    this.spaceService.getSpaceByCategory(id).subscribe({
      next: (response) => {
        this.spaces = response;
      },
    });
  }

  //To get team members
  getTeamMembers() {

    this.teamService.getTeamMembers(this.currentUser.userTeamId).subscribe({
      next: (response) => {
        this.teamMembers = response;
        
      },
    });
  }


  // To check space availability
  checkSpaceAvailability() {
    this.reservationService
      .checkSpaceAvailability(this.reservationForm.value)
      .subscribe({
        next: (response: any) => {
          this.isSpaceAvailable = response.isAvail;
          if (this.isSpaceAvailable) {
            this.toastr.success(response.message);
          } else {
            this.toastr.warning(response.message);
          }
        },
        error: (err) => {
          this.toastr.warning(err.message);
        },
      });
  }

  //Get reserved timings of space
  getReservedTimingsOfSpace(id: number) {
    this.spaceService.getReservedTimings(id, '').subscribe({
      next: (response: ReservationTimings[]) => {
        this.reservations = response;
      },
    });
  }

  onSubmit() {
    this.reservationForm.value.startsAt = new Date(
      this.reservationForm.value.startsAt
    ).toISOString();

    let data = {
      ...this.reservationForm.value,
    };

    if (this.reservationForm.value.selection != 'subteam') {
      data = {
        ...data,
        reservedTeamId: this.currentUser.userTeamId,
        reservedSubTeamId: this.currentUser.userSubTeamId,
      };
    }

    this.reservationService.reserve(data).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        // move to calendar page
        this.router.navigate(['user/calendar']);
      },
    });
  }
}
