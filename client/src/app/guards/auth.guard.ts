import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, of, take } from 'rxjs';
import { User } from '../models/users/User';
import { MembersService } from '../services/members.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  currentUser: User;

  constructor(
    private memberService: MembersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    console.log('[onto guard]');
    let c: User;
    this.memberService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (c = user));
    console.log(c);
    if (c) {
      // this.toastr.success('You shall pass');
      return of(true);
    } else {
      this.toastr.error('You shall not pass');
      this.router.navigate(['/']);
      return of(false);
    }
  }
}
