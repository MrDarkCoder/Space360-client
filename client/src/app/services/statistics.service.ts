import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSpaceBarStats() {
    return this.http.get(this.baseUrl + 'statistics/get-bar-info').pipe(
      map((response) => {
        return response;
      })
    );
  }
}
