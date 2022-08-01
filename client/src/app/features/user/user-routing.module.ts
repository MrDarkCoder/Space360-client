import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserCalendarComponent } from './components/user-calendar/user-calendar.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { UserReservationComponent } from './components/user-reservation/user-reservation.component';
import { UserSpaceDetailComponent } from './components/user-space/user-space-detail/user-space-detail.component';
import { UserSpaceListComponent } from './components/user-space/user-space-list/user-space-list.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      // {
      //   path: 'user',
      //   children: [
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'calendar', component: UserCalendarComponent },
      { path: 'reserve', component: UserReservationComponent },
      { path: 'space', component: UserSpaceListComponent },
      {
        path: 'space/:spacename',
        component: UserSpaceDetailComponent,
        pathMatch: 'full',
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      //   ],
      // },
    ],
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
