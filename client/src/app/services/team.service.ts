import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubTeam } from '../models/forms/SubTeam';
import { UserRespone } from '../models/users/User';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTeams() {
    return this.http.get(this.baseUrl + 'team/form').pipe(
      map((response) => {  
        return response;
      })
    );
  }

  getTeamDetails() {
    return this.http.get(this.baseUrl + 'team').pipe(
      map((response) => {
       
        return response;
      })
    );
  }

  createTeam(team: any) {
    return this.http.post(this.baseUrl + 'team', team);
  }

  getSubTeams(id: number) {
    let params = new HttpParams();
    params = params.append('teamid', id.toString());
    return this.http
      .get(this.baseUrl + 'team/get-subteams-by-teamid?', { params: params })
      .pipe(
        map((response:SubTeam[]) => {
          // console.log('[API - /subTeambyTeamId]', response);
          return response;
        })
      );
  }

  getTeamMembers(id: number) {
    let params = new HttpParams();
    params = params.append('mainTeamId', id.toString());
    return this.http
      .get<UserRespone[]>(this.baseUrl + 'user/get-users-by-teamid?', { params: params })
      .pipe(
        map((response) => {
          
          return response;
        })
      );
  }
}
