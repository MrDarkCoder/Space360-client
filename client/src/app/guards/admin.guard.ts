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
        console.log('gauuad', user);

        if (user.userRole == 'Admin') {
          // if (user.role[0] == 'Admin') {
          //   this.router.navigate(['/admin']);
          // }
          return true;
        }
        console.log("Error, You Can't enter this area");
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
