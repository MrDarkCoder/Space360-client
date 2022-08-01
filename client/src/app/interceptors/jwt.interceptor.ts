import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { MembersService } from '../services/members.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private memberService: MembersService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser: any;

    this.memberService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (currentUser = user));

    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
