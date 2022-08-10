import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-space-create',
  templateUrl: './admin-space-create.component.html',
})
export class AdminSpaceCreateComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Create Space',
        routerLink: 'space-form',
      },
      {
        label: 'Create Space Category',
        routerLink: 'space-category-form',
      },
    ];
  }
}
