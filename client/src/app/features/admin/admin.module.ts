import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { TooltipModule } from 'primeng/tooltip';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminSideNavComponent } from './components/admin-side-nav/admin-side-nav.component';
import { AdminMainContentComponent } from './components/admin-main-content/admin-main-content.component';
import { AdminCalendarComponent } from './components/admin-calendar/admin-calendar.component';
import { SharedModule } from 'src/app/shared/shared.module';

// space
import { AdminSpaceListComponent } from './components/admin-space/admin-space-list/admin-space-list.component';
import { AdminSpaceFormComponent } from './components/admin-space/admin-space-create/admin-space-form/admin-space-form.component';
import { AdminSpaceCreateComponent } from './components/admin-space/admin-space-create/admin-space-create.component';
import { AdminSpaceCategoryFormComponent } from './components/admin-space/admin-space-create/admin-space-category-form/admin-space-category-form.component';
import { AdminSpaceDetailComponent } from './components/admin-space/admin-space-detail/admin-space-detail.component';

// team
import { AdminTeamListComponent } from './components/admin-team/admin-team-list/admin-team-list.component';
import { AdminTeamFormComponent } from './components/admin-team/admin-team-create/admin-team-form/admin-team-form.component';
import { AdminTeamCreateComponent } from './components/admin-team/admin-team-create/admin-team-create.component';
import { AdminSubteamFormComponent } from './components/admin-team/admin-team-create/admin-subteam-form/admin-subteam-form.component';
import { AdminReservationComponent } from './components/admin-reservation/admin-reservation.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminLayoutComponent,
    AdminSideNavComponent,
    AdminCalendarComponent,
    AdminSpaceListComponent,
    AdminSpaceCreateComponent,
    AdminSpaceDetailComponent,
    AdminMainContentComponent,
    AdminTeamListComponent,
    AdminTeamCreateComponent,
    AdminSpaceFormComponent,
    AdminSpaceCategoryFormComponent,
    AdminTeamFormComponent,
    AdminSubteamFormComponent,
    AdminReservationComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, TooltipModule, SharedModule],
})
export class AdminModule {}
