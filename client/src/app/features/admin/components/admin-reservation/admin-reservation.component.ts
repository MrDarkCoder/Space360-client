import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination/pagination';
import { ReserParams } from 'src/app/models/pagination/reserParams';
import { ReservationsService } from 'src/app/services/reservations.service';
import { StatisticsService } from 'src/app/services/statistics.service';

import { utc } from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
})
export class AdminReservationComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  pagination: Pagination;

  reserParams: ReserParams = new ReserParams();
  reservations = [];

  utc = utc;

  dropdownForm: FormGroup;
  dropdown = [
    { id: 1, pageSize: 3 },
    { id: 2, pageSize: 5 },
    { id: 3, pageSize: 15 },
    { id: 4, pageSize: 25 },
  ];

  constructor(
    private reservationsService: ReservationsService,
    private statService: StatisticsService,
    private fb: FormBuilder
  ) {}

  // labels: ['Elon Musk', 'Silicon Valley', 'Training Hall', 'New York'],
  // data: [65, 59, 80, 81],
  ngOnInit(): void {
    this.loadSpaceBarChart(false);
    this.loadReservations();
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#000',
          },
          font: {
            weight: 'bold',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#000',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
        y: {
          ticks: {
            color: '#000',
          },
          grid: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
      },
    };
    this.initializeForm();
  }

  initializeForm() {
    this.dropdownForm = this.fb.group({
      pageSize: [this.reserParams.pageSize, Validators.required],
    });
  }

  changePageSize(event: any) {
    this.dropdownForm.get('pageSize').setValue(event.target.value, {
      onlySelf: true,
    });
    this.reserParams.pageSize = this.dropdownForm.value.pageSize;
    this.loadReservations();
    console.log(this.dropdownForm.value);
  }

  handleErrorDropDown = (controlName: string, errorName: string) => {
    return this.dropdownForm.controls[controlName].hasError(errorName);
  };

  onSubmit() {
    console.log('new page size', this.dropdownForm.value);
  }

  nextPage(event: any) {
    console.log(event);
    this.reserParams.pageNumber = event.page;
    this.loadReservations();
  }

  loadReservations() {
    this.reservationsService.getReservations(this.reserParams).subscribe({
      next: (response) => {
        this.reservations = response.results;
        this.pagination = response.pagination;
        console.log(this.pagination);
        console.log(this.reservations);
      },
    });
  }

  loadSpaceBarChart(isRefresh: boolean) {
    this.statService.getSpaceBarStats(isRefresh).subscribe({
      next: (response: any) => {
        console.log('[stats] ', response);

        this.basicData = {
          labels: response.labels,
          datasets: [
            {
              label: 'Completed',
              backgroundColor: 'rgba(108, 219, 147, 255)',
              data: [],
            },
            {
              label: 'Cancelled',
              backgroundColor: '#F27B57',
              data: [],
            },
            {
              label: 'Scheduled',
              backgroundColor: '#1363DF',
              data: [],
            },
          ],
        };
        let o = 0;
        let k = 0;
        response?.data.forEach((d) => {
          console.log(d);
          d.forEach((l) => {
            console.log(l);

            if (l == 0) l = ++o;
            this.basicData.datasets[k++].data.push(l);
          });
          k = 0;
        });
      },
    });
  }

  refresh() {
    this.loadSpaceBarChart(true);
    this.loadReservations();
  }
}
