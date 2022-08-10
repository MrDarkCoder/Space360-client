import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/pagination/pagination';
import { ReserParams } from 'src/app/models/pagination/reserParams';
import { ReservationsService } from 'src/app/services/reservations.service';

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

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.loadReservations();
    this.basicData = {
      labels: ['Elon Musk', 'Silicon Valley', 'Training Hall', 'New York'],
      datasets: [
        {
          label: 'Completed',
          backgroundColor: 'rgba(108, 219, 147, 255)',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'On Progress',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
        {
          label: 'Cancelled',
          backgroundColor: '#F27B57',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'Scheduled',
          backgroundColor: '#1363DF',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };
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
}
