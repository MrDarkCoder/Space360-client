import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { MembersService } from '../services/members.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private memberService: MembersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    console.log('[onto guard]');

    return this.memberService.currentUser$.pipe(
      map((user) => {
        if (user) {
          console.log('[into if true guard]');
          return true;
        }
        console.log('[into if false guard]');
        this.toastr.error('You shall not pass!');
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
