import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-reservation-list',
  templateUrl: './user-reservation-list.component.html',
  styleUrls: ['./user-reservation-list.component.scss'],
})
export class UserReservationListComponent implements OnInit {
  spaces = [];
  reservations = [];
  constructor() {}

  ngOnInit(): void {}
}
