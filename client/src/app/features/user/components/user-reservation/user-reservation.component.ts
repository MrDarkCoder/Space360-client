import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { take } from 'rxjs';
import { utc } from 'moment';

import { User } from 'src/app/models/users/User';
import { MembersService } from 'src/app/services/members.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { SpaceService } from 'src/app/services/space.service';
import { TeamService } from 'src/app/services/team.service';

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

  subTeams: any;
  teamMembers: any;
  filteredTeammembers: any;
  spaceCategory: any;
  spaces: any;
  reservations = [];

  isSpaceAvailable = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private memberService: MembersService,
    private teamService: TeamService,
    private spaceService: SpaceService,
    private reservationService: ReservationsService
  ) {}

  ngOnInit(): void {
    // Default starts At
    // this.startsTime.setHours(9);
    // this.startsTime.setMinutes(0);

    // max Time
    this.maxTime.setHours(19);
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

  getSubTeamsByMainTeamId() {
    this.teamService.getSubTeams(this.currentUser.userTeamId).subscribe({
      next: (response) => {
        console.log('[subteam]', response);
        this.subTeams = response;
      },
    });
  }

  getSpaceCategory() {
    this.spaceService.getSpaceCategory().subscribe({
      next: (response) => {
        console.log('[Space]', response);
        this.spaceCategory = response;
      },
    });
  }

  changeCategory(event: any) {
    this.reservationForm.get('spaceCategoryId').setValue(event.target.value, {
      onlySelf: true,
    });
    console.log(
      '[selected cate id]',
      this.reservationForm.value.spaceCategoryId
    );
    this.getSpaceByCategory(this.reservationForm.value.spaceCategoryId);
  }

  changeSpace(event: any) {
    this.reservationForm.get('reservedSpaceId').setValue(event.target.value, {
      onlySelf: true,
    });
    this.getReservedTimingsOfSpace(this.reservationForm.value.reservedSpaceId);
  }

  getSpaceByCategory(id: number) {
    this.spaceService.getSpaceByCategory(id).subscribe({
      next: (response) => {
        this.spaces = response;
        console.log('[Sapces by cate id]', response);
      },
    });
  }

  getTeamMembers() {
    console.log('[teamid]', this.currentUser.userTeamId);

    this.teamService.getTeamMembers(this.currentUser.userTeamId).subscribe({
      next: (response) => {
        this.teamMembers = response;
        console.log('[teammembers]', this.teamMembers);
      },
    });
  }

  checkSpaceAvailability() {
    let d = new Date(this.reservationForm.value.startsAt).toISOString();

    console.log('[checker]', this.reservationForm.value);

    this.reservationService
      .chechSpaceAvailability(this.reservationForm.value)
      .subscribe({
        next: (response: any) => {
          this.isSpaceAvailable = response.isAvail;
          if (this.isSpaceAvailable) {
            this.toastr.success(response.message);
          } else {
            this.toastr.warning(response.message);
          }
          console.log(response);
        },
        error: (err) => {
          console.log(err);
          this.toastr.warning(err.message);
        },
      });
  }

  getReservedTimingsOfSpace(id: number) {
    this.spaceService.getReservedTimings(id, '').subscribe({
      next: (response: any) => {
        console.log('[timings]', response);
        this.reservations = response;
      },
    });
  }

  onSubmit() {
    this.reservationForm.value.startsAt = new Date(
      this.reservationForm.value.startsAt
    ).toISOString();

    let d = {
      ...this.reservationForm.value,
    };

    if (this.reservationForm.value.selection != 'subteam') {
      d = {
        ...d,
        reservedTeamId: this.currentUser.userTeamId,
        reservedSubTeamId: this.currentUser.userSubTeamId,
      };
    }

    console.log('[reser]', d);

    this.reservationService.reserve(d).subscribe({
      next: (response: any) => {
        console.log(response);
        this.toastr.success(response.message);
        // move to calendar page
      },
    });
  }
}
