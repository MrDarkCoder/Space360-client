import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

import { AdminSpaceCreateComponent } from './components/admin-space/admin-space-create/admin-space-create.component';
import { AdminSpaceFormComponent } from './components/admin-space/admin-space-create/admin-space-form/admin-space-form.component';
import { AdminSpaceCategoryFormComponent } from './components/admin-space/admin-space-create/admin-space-category-form/admin-space-category-form.component';

import { AdminSpaceDetailComponent } from './components/admin-space/admin-space-detail/admin-space-detail.component';
import { AdminSpaceListComponent } from './components/admin-space/admin-space-list/admin-space-list.component';
import { AdminTeamListComponent } from './components/admin-team/admin-team-list/admin-team-list.component';
import { AdminTeamCreateComponent } from './components/admin-team/admin-team-create/admin-team-create.component';
import { AdminTeamFormComponent } from './components/admin-team/admin-team-create/admin-team-form/admin-team-form.component';
import { AdminSubteamFormComponent } from './components/admin-team/admin-team-create/admin-subteam-form/admin-subteam-form.component';
import { AdminReservationComponent } from './components/admin-reservation/admin-reservation.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      // {
      // path: 'admin',
      // children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'reservation', component: AdminReservationComponent },
      { path: 'space', component: AdminSpaceListComponent },
      {
        path: 'space/create',
        component: AdminSpaceCreateComponent,
        children: [
          { path: 'space-form', component: AdminSpaceFormComponent },
          {
            path: 'space-category-form',
            component: AdminSpaceCategoryFormComponent,
          },
          { path: '', redirectTo: 'space-form', pathMatch: 'full' },
        ],
      },
      {
        path: 'space/:spacename',
        component: AdminSpaceDetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'team',
        component: AdminTeamListComponent,
      },
      {
        path: 'team/create',
        component: AdminTeamCreateComponent,
        children: [
          { path: 'team-form', component: AdminTeamFormComponent },
          { path: 'sub-team-form', component: AdminSubteamFormComponent },
          { path: '', redirectTo: 'team-form', pathMatch: 'full' },
        ],
      },

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
