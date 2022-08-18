import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take } from 'rxjs';
import { User } from '../models/users/User';
import { MembersService } from '../services/members.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuardGuard implements CanActivate {
  user: User;

  constructor(private memberService: MembersService, private router: Router) {}
  canActivate(): boolean {
    this.memberService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));

    if (this.user) {
      let url = `/${this.user?.userRole?.toLowerCase()}`;
      this.router.navigate([url]);
      return false;
    }

    return true;
  }
}
