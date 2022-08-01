import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
})
export class UserLayoutComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidth = 0;
  constructor() {}

  ngOnInit(): void {}

  onToggleSideNav(data: any): void {
    // console.log('inside layout ', data);
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
}
