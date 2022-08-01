import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-main-content',
  templateUrl: './admin-main-content.component.html',
  styleUrls: ['./admin-main-content.component.scss'],
})
export class AdminMainContentComponent implements OnInit {
  @Input() isSideNavCollapsed = false;
  @Input() screenWidth!: number;

  constructor() {}

  ngOnInit(): void {}

  getBodyClass(): string {
    // console.log('inside main', this.isSideNavCollapsed, this.screenWidth);
    let styleClass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.isSideNavCollapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
