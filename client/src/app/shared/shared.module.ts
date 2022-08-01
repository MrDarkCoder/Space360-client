import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';

import { HomeComponent } from './components/home/home.component';
import { TextInputComponent } from './components/form/text-input/text-input.component';

@NgModule({
  declarations: [HomeComponent, TextInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    HomeComponent,
    TextInputComponent,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
  ],
})
export class SharedModule {}
