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
import { NotFoundComponent } from 'src/app/error/not-found/not-found.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { AdminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        title: 'Dashboard',
      },
      {
        path: 'reservation',
        component: AdminReservationComponent,
        title: 'Reservation',
      },
      { path: 'space', component: AdminSpaceListComponent, title: 'Space' },
      {
        path: 'space/create',
        component: AdminSpaceCreateComponent,
        children: [
          {
            path: 'space-form',
            component: AdminSpaceFormComponent,
            title: 'Space Form',
          },
          {
            path: 'space-category-form',
            component: AdminSpaceCategoryFormComponent,
            title: 'Space Category Form',
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
        title: 'Team',
      },
      {
        path: 'team/create',
        component: AdminTeamCreateComponent,
        children: [
          {
            path: 'team-form',
            component: AdminTeamFormComponent,
            title: 'Team Create Form',
          },
          {
            path: 'sub-team-form',
            component: AdminSubteamFormComponent,
            title: 'Sub Team Create Form',
          },
          { path: '', redirectTo: 'team-form', pathMatch: 'full' },
        ],
      },
    ],
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full',
    title: 'Not Found',
  },
];

const rot: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'admin',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard, AdminGuard],
        children: [
          {
            path: 'dashboard',
            component: AdminDashboardComponent,
            title: 'Dashboard',
          },
          {
            path: 'reservation',
            component: AdminReservationComponent,
            title: 'Reservation',
          },
          { path: 'space', component: AdminSpaceListComponent, title: 'Space' },
          {
            path: 'space/create',
            component: AdminSpaceCreateComponent,
            children: [
              {
                path: 'space-form',
                component: AdminSpaceFormComponent,
                title: 'Space Form',
              },
              {
                path: 'space-category-form',
                component: AdminSpaceCategoryFormComponent,
                title: 'Space Category Form',
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
            title: 'Team',
          },
          {
            path: 'team/create',
            component: AdminTeamCreateComponent,
            children: [
              {
                path: 'team-form',
                component: AdminTeamFormComponent,
                title: 'Team Create Form',
              },
              {
                path: 'sub-team-form',
                component: AdminSubteamFormComponent,
                title: 'Team Create Form',
              },
              { path: '', redirectTo: 'team-form', pathMatch: 'full' },
            ],
          },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
export class AdminRoutingModule {}
