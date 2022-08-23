import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../models/pagination/pagination';
import { ReserParams } from '../models/pagination/reserParams';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  baseUrl = environment.apiUrl;

  reservations: any;

  userReservation: any;

  constructor(private http: HttpClient) {}

  getReservations(reserParams: ReserParams) {
    let params = this.getPaginationHeaders(
      reserParams.pageNumber,
      reserParams.pageSize
    );

    const url = this.baseUrl + 'reservation';
    return this.getPaginatedResult<any>(url, params);
  }

  getAllReservations() {
    return this.http.get(this.baseUrl + 'reservation/all-reservations').pipe(
      map((response) => {
        return response;
      })
    );
  }

  getReservationByUser(id: number, isRefresh: boolean) {
    if (this.userReservation && !isRefresh) {
      return of(this.userReservation);
    }
    return this.http.get(this.baseUrl + 'reservation/' + id).pipe(
      map((response) => {
        this.userReservation = response;
        return response;
      })
    );
  }

  reserve(data: any) {
    return this.http.post(this.baseUrl + 'reservation/reservee', data).pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    );
  }

  checkSpaceAvailability(data: any) {
    return this.http
      .post(this.baseUrl + 'reservation/check-space-available', data)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }

  cancelReservationByUser(id: number) {
    return this.http
      .get(this.baseUrl + 'reservation/cancel-reservation/' + id)
      .pipe(
        map((response) => {
          console.log(response);

          return response;
        })
      );
  }

  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResults: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http
      .get<T>(url, {
        observe: 'response',
        params: params,
      })
      .pipe(
        map((response) => {
          paginatedResults.results = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResults.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResults;
        })
      );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }
}

// {
//   "reservationId": 9,
//   "reservationTitle": "check",
//   "team": {
//     "teamId": 1,
//     "teamName": "Churn360"
//   },
//   "subTeam": {
//     "subTeamId": 1,
//     "subTeamName": "Engineering"
//   },
//   "reservedSpace": {
//     "spaceId": 1,
//     "spaceName": "Elon Musk",
//     "spaceCategory": {
//       "spaceCategoryId": 2,
//       "spaceCategoryName": "Conference Hall"
//     },
//     "spaceCapacity": 10
//   },
//   "startsAt": "2022-08-10T08:52:58.474",
//   "endsAt": "2022-08-10T09:22:58.474",
//   "acceptedCount": 0,
//   "invitedCount": 0,
//   "status": {
//     "statusName": "SCHEDULED"
//   },
//   "reservedByUser": {
//     "username": "Methran",
//     "email": "methran2003@gmail.com"
//   }
// }
