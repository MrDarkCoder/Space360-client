import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-team-create',
  templateUrl: './admin-team-create.component.html',
})
export class AdminTeamCreateComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Create Team',
        routerLink: 'team-form',
      },
      {
        label: 'Create SubTeam',
        routerLink: 'sub-team-form',
      },
    ];
  }
}
