import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination/pagination';
import { ReserParams } from 'src/app/models/pagination/reserParams';
import { ReservationsService } from 'src/app/services/reservations.service';
import { StatisticsService } from 'src/app/services/statistics.service';

import { utc } from 'moment';

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

  constructor(
    private reservationsService: ReservationsService,
    private statService: StatisticsService
  ) {}

  // labels: ['Elon Musk', 'Silicon Valley', 'Training Hall', 'New York'],
  // data: [65, 59, 80, 81],
  ngOnInit(): void {
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

    this.loadSpaceBarChart();
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

  loadSpaceBarChart() {
    this.statService.getSpaceBarStats().subscribe({
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
}
