import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { StepsModule } from 'primeng/steps';
import { ChartModule } from 'primeng/chart';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { HomeComponent } from './components/home/home.component';
import { TextInputComponent } from './components/form/text-input/text-input.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [HomeComponent, TextInputComponent, CardComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TableModule],
  exports: [
    HomeComponent,
    TextInputComponent,
    ReactiveFormsModule,
    FormsModule,
    CardComponent,
    CardModule,
    TableModule,
    StepsModule,
    OrganizationChartModule,
    ChartModule,
    PaginationModule,
    TimepickerModule,
    AutoCompleteModule,
  ],
})
export class SharedModule {}
