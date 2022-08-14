import { Component } from '@angular/core';
import { User } from './models/users/User';
import { MembersService } from './services/members.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  users: any;

  constructor(private memberService: MembersService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user?.email) this.memberService.setCurrentUser(user);
  }
}
