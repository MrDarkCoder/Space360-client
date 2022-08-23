import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { MembersService } from '../services/members.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private memberService: MembersService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.memberService.currentUser$.pipe(
      map((user) => {
        if (user.userRole == 'Admin') {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
