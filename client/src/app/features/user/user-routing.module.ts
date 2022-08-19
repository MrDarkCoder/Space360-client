import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/error/not-found/not-found.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { UserCalendarComponent } from './components/user-calendar/user-calendar.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { UserReservationListComponent } from './components/user-reservation-list/user-reservation-list.component';
import { UserReservationComponent } from './components/user-reservation/user-reservation.component';
import { UserSpaceDetailComponent } from './components/user-space/user-space-detail/user-space-detail.component';
import { UserSpaceListComponent } from './components/user-space/user-space-list/user-space-list.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserLayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: UserDashboardComponent,
        title: 'dashboard',
      },
      { path: 'calendar', component: UserCalendarComponent, title: 'Calendar' },
      {
        path: 'reserve',
        component: UserReservationComponent,
        title: 'Reserve A Space',
      },
      {
        path: 'reservations',
        component: UserReservationListComponent,
        title: 'Reservations',
      },
      { path: 'space', component: UserSpaceListComponent, title: 'Space' },
      { path: '', redirectTo: 'space', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent, pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
];

const rot: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'user',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'calendar',
            component: UserCalendarComponent,
            title: 'Calendar',
          },
          {
            path: 'reserve',
            component: UserReservationComponent,
            title: 'Reservation Form',
          },
          {
            path: 'reservations',
            component: UserReservationListComponent,
            title: 'Reservations',
          },
          { path: 'space', component: UserSpaceListComponent, title: 'Space' },
          { path: '', redirectTo: 'space', pathMatch: 'full' },
          {
            path: '**',
            component: NotFoundComponent,
            pathMatch: 'full',
            title: 'Not Found',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rot)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
