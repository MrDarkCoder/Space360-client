import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  // styleUrls: [],
})
export class AdminLayoutComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor() {}

  onToggleSideNav(data: any): void {
    // console.log('inside layout ', data);
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
}
