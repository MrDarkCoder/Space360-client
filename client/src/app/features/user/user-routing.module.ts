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
      // {
      //   path: 'user',
      //   children: [
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'calendar', component: UserCalendarComponent },
      { path: 'reserve', component: UserReservationComponent },
      { path: 'reservations', component: UserReservationListComponent },
      { path: 'space', component: UserSpaceListComponent },
      {
        path: 'space/:spacename',
        component: UserSpaceDetailComponent,
        pathMatch: 'full',
      },
      { path: '', redirectTo: 'space', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent, pathMatch: 'full' },
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
