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

const sidebarData = [
  {
    routerLink: '/admin/dashboard',
    icon: 'bi bi-bar-chart-fill',
    label: 'Dashboard',
  },
  {
    routerLink: '/admin/reservation',
    icon: 'bi bi-journal-bookmark-fill',
    label: 'Reservation',
  },
  {
    routerLink: '/admin/space',
    icon: 'bi bi-building',
    label: 'Space',
  },
  {
    routerLink: '/admin/team',
    icon: 'bi bi-people',
    label: 'Team',
  },
];

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('450ms', style({ opacity: 1 })),
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
export class AdminSideNavComponent implements OnInit {
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

  constructor(private memberService: MembersService) {}

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

  logOut() {
    console.log('logged out');
    this.memberService.logout();
  }
}
