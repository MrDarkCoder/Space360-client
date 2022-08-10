import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubteamService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createSubTeam(subteam: any) {
    return this.http.post(this.baseUrl + 'subTeam', subteam).pipe(
      map((response) => {
        return response;
      })
    );
  }
  
}
