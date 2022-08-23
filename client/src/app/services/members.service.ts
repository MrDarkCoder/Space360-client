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

  //For user login
  login(data: any) {
    return this.http.post(this.baseUrl + 'auth/login', data).pipe(
      map((response: User) => {
        const user = response;

        if (user) {
          this.setCurrentUser(user);
          // routing;
          if (user.userRole == 'Admin') {
            this.router.navigateByUrl('/admin');
          } else if (user.userRole == 'User') {
            this.router.navigateByUrl('/user');
          }
          return response;
        }
        return null;
      })
    );
  }

  //Set the logged user details in Localstorage and updates the currentUser instance
  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.next(user);
  }


  //For register
  register(data: any) {
    return this.http.post(this.baseUrl + 'auth/register', data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  //To verify email by sending Otp
  verifyEmail(otp: string) {
    return this.http.post(this.baseUrl + 'auth/verify-mail/' + otp, {}).pipe(
      map((response) => {
        return response;
      })
    );
  }

//For submitting reset password request
  resetAccountCheck(data: any) {
    return this.http.post(this.baseUrl + 'auth/forgot-password', data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  //To reset password
  resetPassword(data: any) {
    return this.http.post(this.baseUrl + 'auth/reset-password', data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  //delete the user item in local storage
  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this.router.navigate(['/']);
  }
}
