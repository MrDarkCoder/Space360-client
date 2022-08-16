import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/users/User';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;

  private currentUser = new ReplaySubject<User>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    // set current user - pending
    return this.http.post(this.baseUrl + 'auth/login', data).pipe(
      map((response: User) => {
        const user = response;
        console.log('[API - LOGIN]', response);
        if (user) {
          this.setCurrentUser(user);
          // routing;
          if (user.userRole == 'Admin') {
            this.router.navigateByUrl('/admin');
          } else if (user.userRole == 'User') {
            this.router.navigateByUrl('/user');
          }
        }
        return response;
      })
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.next(user);
  }

  register(data: any) {
    return this.http.post(this.baseUrl + 'auth/register', data).pipe(
      map((response) => {
        console.log('[API - Register]', response);
        return response;
      })
    );
  }

  verifyEmail(id: string) {
    return this.http.post(this.baseUrl + 'auth/verify-mail/' + id, {}).pipe(
      map((response) => {
        console.log('[API - Verify]', response);
        return response;
      })
    );
  }

  resetAccountCheck(data: any) {
    return this.http.post(this.baseUrl + 'auth/forgot-password', data).pipe(
      map((response) => {
        console.log('[API - REset account check]');
        return response;
      })
    );
  }

  resetPassword(data: any) {
    return this.http.post(this.baseUrl + 'auth/reset-password', data).pipe(
      map((response) => {
        console.log('[RESET PWD]', response);
        return response;
      })
    );
  }
}
