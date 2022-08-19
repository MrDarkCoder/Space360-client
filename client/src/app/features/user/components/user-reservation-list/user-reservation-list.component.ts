import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { utc } from 'moment';

import { User } from 'src/app/models/users/User';
import { MembersService } from 'src/app/services/members.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-reservation-list',
  templateUrl: './user-reservation-list.component.html',
  styleUrls: ['./user-reservation-list.component.scss'],
})
export class UserReservationListComponent implements OnInit {
  spaces = [];
  reservations = [];
  currentUser: User;
  utc = utc;

  constructor(
    private reservationService: ReservationsService,
    private memberService: MembersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // current user
    this.memberService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.currentUser = user));

    this.getReservationsByUser();
  }

  getReservationsByUser() {
    this.reservationService
      .getReservationByUser(this.currentUser.userId, false)
      .subscribe({
        next: (response: any) => {
          console.log('[COMP] user-rev-list', response);
          this.reservations = response;
        },
      });
  }

  clicked(event: any) {
    console.log('[clicked]', event);
    this.reservationService.cancelReservationByUser(event).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.refreshTable();
      },
    });
  }

  moveToReserv() {
    this.router.navigateByUrl('user/reserve');
    // console.log('[clicked]');
  }

  refreshTable() {
    this.reservationService
      .getReservationByUser(this.currentUser.userId, true)
      .subscribe({
        next: (response: any) => {
          console.log('[COMP] user-rev-list', response);
          this.reservations = response;
        },
      });
  }
}

/*
  {
    "reservationId": 21,
    "reservationTitle": "checking client",
    "team": {
      "teamId": 1,
      "teamName": "Churn360"
    },
    "subTeam": {
      "subTeamId": 1,
      "subTeamName": "Engineering"
    },
    "reservedSpace": {
      "spaceId": 4,
      "spaceName": "Silicon Valley",
      "spaceCategory": {
        "spaceCategoryId": 2,
        "spaceCategoryName": "Conference Hall"
      },
      "opensAt": "2022-08-12T09:00:57",
      "closesAt": "2022-08-12T18:00:57",
      "spaceCapacity": 18,
      "imageUrl": "https://space360.blob.core.windows.net/space-cover-images/01_Landing_page.png"
    },
    "startsAt": "2022-08-14T12:37:37.469",
    "endsAt": "2022-08-14T13:37:37.469",
    "acceptedCount": 0,
    "invitedCount": 0,
    "status": {
      "statusName": "SCHEDULED"
    },
    "reservedByUser": {
      "userId": 1,
      "username": "mrsridhar",
      "email": "sridharpadmanaben@gmail.com"
    },
    "isCancelled": false
  }
*/
