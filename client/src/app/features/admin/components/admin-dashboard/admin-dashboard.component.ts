import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  basicData: any;
  horizontalOptions: any;
  spacePieData: any;
  chartOptions: any;
  verticalData: any;
  verticalOptions: any;

  cards: any;

  constructor(private statService: StatisticsService, private router: Router) {}

  ngOnInit(): void {
    this.horizontalOptions = {
      indexAxis: 'y',
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
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
    };
    this.verticalOptions = {
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

    this.getCardStats();
    this.getSpacePieChart();
    this.getTeamBarChart();
    this.getSpaceCategoryBarChart();
  }

  getCardStats() {
    this.statService.getCardStats(false).subscribe({
      next: (response) => {
        this.cards = response;
        console.log('[card]', response);
      },
    });
  }

  refreshStats() {
    this.statService.getCardStats(true).subscribe({
      next: (response) => {
        this.cards = response;
        console.log('[Ref]', response);
      },
    });

    this.statService.getSpacePieStats(true).subscribe({
      next: (response) => {
        this.spacePieData = {
          labels: response.labels,
          datasets: [
            {
              label: 'Reservations',
              backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
              hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D'],
              data: response.data,
            },
          ],
        };
      },
    });

    this.statService.getTeamBar(true).subscribe({
      next: (response) => {
        this.verticalData = {
          labels: response.label,
          datasets: [
            {
              label: 'Reservations',
              backgroundColor: '#42A5F5',
              data: response.data,
            },
          ],
        };
      },
    });

    this.statService.getSpaceCategoryBar(false).subscribe({
      next: (response) => {
        this.basicData = {
          labels: response.labels,
          datasets: [
            {
              label: 'Reserved',
              backgroundColor: '#42A5F5',
              data: [],
            },
            {
              label: 'Cancelled',
              backgroundColor: '#FFA726',
              data: [],
            },
          ],
        };

        let o = 0;
        let k = 0;

        response?.data.forEach((d) => {
          d.forEach((l) => {
            if (l == 0) l = ++o;
            this.basicData.datasets[k++].data.push(l);
          });
          k = 0;
        });
      },
    });
  }

  getSpacePieChart() {
    this.statService.getSpacePieStats(false).subscribe({
      next: (response) => {
        this.spacePieData = {
          labels: response.labels,
          datasets: [
            {
              label: 'Reservations',
              backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
              hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D'],
              data: response.data,
            },
          ],
        };
      },
    });
  }

  getTeamBarChart() {
    this.statService.getTeamBar(false).subscribe({
      next: (response) => {
        this.verticalData = {
          labels: response.label,
          datasets: [
            {
              label: 'Reservations',
              backgroundColor: '#42A5F5',
              data: response.data,
            },
          ],
        };
      },
    });
  }

  getSpaceCategoryBarChart() {
    this.statService.getSpaceCategoryBar(false).subscribe({
      next: (response) => {
        console.log("log", response);
        
        this.basicData = {
          labels: response.labels,
          datasets: [
            {
              label: 'Reserved',
              backgroundColor: '#42A5F5',
              data: [],
            },
            {
              label: 'Cancelled',
              backgroundColor: '#FFA726',
              data: [],
            },
          ],
        };

        let o = 0;
        let k = 0;

        response?.data.forEach((d) => {
          d.forEach((l) => {
            if (l == 0) l = ++o;
            this.basicData.datasets[k++].data.push(l);
          });
          k = 0;
        });
      },
    });
  }

  moveToTeamPage() {
    this.router.navigate(['admin/team']);
  }

  moveToSpacePage() {
    this.router.navigate(['admin/space']);
  }
}

/**
 * reservations: 
  {totalReserved: 1, 
    totalCancelled: 1,
     totalOnProgress: 0, 
     totalScheduled: 0}
  space: 
  {totalSpaceCategory: 2,
     totalSpace: 4, 
     totalAvailableSpace: 2, 
     totalReservedSpace: 2}
  team: 
  {totalTeams: 4, 
    totalUsers: 2}
 */
