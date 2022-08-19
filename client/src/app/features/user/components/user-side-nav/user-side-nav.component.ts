import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';

import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MembersService } from 'src/app/services/members.service';
import { User } from 'src/app/models/users/User';
import { Router } from '@angular/router';

const sidebarData = [
  {
    routerLink: '/user/space',
    icon: 'bi bi-house-fill',
    label: 'Space',
  },
  {
    routerLink: '/user/calendar',
    icon: 'bi bi-calendar-range',
    label: 'Calendar',
  },
  {
    routerLink: '/user/reserve',
    icon: 'bi bi-journal-album',
    label: 'Reserve',
  },
  {
    routerLink: '/user/reservations',
    icon: 'bi-journal-arrow-down',
    label: 'My Reservations',
  },
];

@Component({
  selector: 'app-user-side-nav',
  templateUrl: './user-side-nav.component.html',
  styleUrls: ['./user-side-nav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class UserSideNavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<any> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = sidebarData;

  currentUser: User;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  constructor(private memberService: MembersService, private router: Router) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.memberService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  moveToAdmin() {
    this.router.navigate(['/admin']);
  }

  logOut() {
    console.log('logged out');
    this.memberService.logout();
  }
}
