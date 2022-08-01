import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCalendarComponent } from './components/admin-calendar/admin-calendar.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminSpaceCreateComponent } from './components/admin-space/admin-space-create/admin-space-create.component';
import { AdminSpaceDetailComponent } from './components/admin-space/admin-space-detail/admin-space-detail.component';
import { AdminSpaceListComponent } from './components/admin-space/admin-space-list/admin-space-list.component';
import { AdminTeamListComponent } from './components/admin-team/admin-team-list/admin-team-list.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      // {
      // path: 'admin',
      // children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'calendar', component: AdminCalendarComponent },
      { path: 'space', component: AdminSpaceListComponent },
      { path: 'space/create', component: AdminSpaceCreateComponent },
      {
        path: 'space/:spacename',
        component: AdminSpaceDetailComponent,
        pathMatch: 'full',
      },
      { path: 'team', component: AdminTeamListComponent }, // create will inside
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      //   ],
      // },
    ],
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
