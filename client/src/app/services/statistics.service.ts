import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  baseUrl = environment.apiUrl;

  cards: any;

  spacePieData: any;

  spaceCategoryData: any;

  teamBarData: any;

  constructor(private http: HttpClient) {}

  getSpaceBarStats() {
    return this.http.get(this.baseUrl + 'statistics/get-space-bar-stats').pipe(
      map((response) => {
        return response;
      })
    );
  }

  getCardStats(isRefresh: boolean) {
    if (this.cards && !isRefresh) {
      return of(this.cards);
    }
    return this.http.get(this.baseUrl + 'statistics/get-card-stats').pipe(
      map((response) => {
        this.cards = response;
        return response;
      })
    );
  }

  getSpacePieStats(isRefresh: boolean) {
    if (this.spacePieData && !isRefresh) {
      return of(this.spacePieData);
    }
    return this.http.get(this.baseUrl + 'statistics/get-teams-pie-stats').pipe(
      map((response) => {
        this.spacePieData = response;
        return response;
      })
    );
  }

  getSpaceCategoryBar(isRefresh: boolean) {
    if (this.spaceCategoryData && !isRefresh) {
      return of(this.spaceCategoryData);
    }
    return this.http
      .get(this.baseUrl + 'statistics/get-category-bar-stats')
      .pipe(
        map((response) => {
          this.spaceCategoryData = response;
          return response;
        })
      );
  }

  getTeamBar(isRefresh: boolean) {
    if (this.teamBarData && !isRefresh) {
      return of(this.teamBarData);
    }
    return this.http.get(this.baseUrl + 'statistics/get-teams-bar-stats').pipe(
      map((response) => {
        this.teamBarData = response;
        return response;
      })
    );
  }
}
