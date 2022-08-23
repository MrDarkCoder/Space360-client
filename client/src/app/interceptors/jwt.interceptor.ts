import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { MembersService } from '../services/members.service';
import { User } from '../models/users/User';


//Interceptor to set authorization header
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private memberService: MembersService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser: User;

    this.memberService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (currentUser = user));

      //If user exists a clone of current request would be taken and header would be attached
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
    }

    //Passing request to the next control
    return next.handle(request);
  }
}
