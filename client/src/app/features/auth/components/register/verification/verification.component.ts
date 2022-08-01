import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgOtpInputConfig } from 'ng-otp-input';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
})
export class VerificationComponent implements OnInit {
  otp: string = '';

  config: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
  };

  constructor(
    private router: Router,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  // call verification end point
  submit() {
    if (this.otp.length == 6) {
      console.dir(this.otp);
      // verify it
      this.memberService.verifyEmail(this.otp).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message, 'Verified');
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.log('[Verify - ERR]', err);
          this.toastr.error('Something went Wrong', 'Verify');
        },
      });
      // route back to login
    }
  }
}
