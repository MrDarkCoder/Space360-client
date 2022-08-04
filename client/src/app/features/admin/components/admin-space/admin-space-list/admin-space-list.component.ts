import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-space-list',
  templateUrl: './admin-space-list.component.html',
  styleUrls: ['./admin-space-list.component.scss'],
})
export class AdminSpaceListComponent implements OnInit {
  spaces = [{ id: 1 }, { id: 2 }, { id: 3 }];

  constructor() {}

  ngOnInit(): void {}
}
