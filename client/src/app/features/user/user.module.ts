import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserCalendarComponent } from './components/user-calendar/user-calendar.component';
import { UserReservationComponent } from './components/user-reservation/user-reservation.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { UserMainContentComponent } from './components/user-main-content/user-main-content.component';
import { UserSideNavComponent } from './components/user-side-nav/user-side-nav.component';
import { UserSpaceListComponent } from './components/user-space/user-space-list/user-space-list.component';
import { UserSpaceDetailComponent } from './components/user-space/user-space-detail/user-space-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserCalendarComponent,
    UserReservationComponent,
    UserLayoutComponent,
    UserMainContentComponent,
    UserSideNavComponent,
    UserSpaceListComponent,
    UserSpaceDetailComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
