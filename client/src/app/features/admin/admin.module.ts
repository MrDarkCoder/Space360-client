import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { TooltipModule } from 'primeng/tooltip';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminSideNavComponent } from './components/admin-side-nav/admin-side-nav.component';
import { AdminCalendarComponent } from './components/admin-calendar/admin-calendar.component';
import { AdminSpaceListComponent } from './components/admin-space/admin-space-list/admin-space-list.component';
import { AdminSpaceCreateComponent } from './components/admin-space/admin-space-create/admin-space-create.component';
import { AdminSpaceDetailComponent } from './components/admin-space/admin-space-detail/admin-space-detail.component';
import { AdminMainContentComponent } from './components/admin-main-content/admin-main-content.component';
import { AdminTeamListComponent } from './components/admin-team/admin-team-list/admin-team-list.component';
import { AdminTeamCreateComponent } from './components/admin-team/admin-team-create/admin-team-create.component';

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
  ],
  imports: [CommonModule, AdminRoutingModule, TooltipModule],
})
export class AdminModule {}
