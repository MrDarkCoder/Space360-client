import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgOtpInputConfig } from 'ng-otp-input';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
})
export class VerificationComponent implements OnInit {
  otp: string = '';

  config: NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  // call verification end point
  submit() {
    if (this.otp.length == 6) {
      console.dir(this.otp);
      // verify it
      // route back to login
    }
  }
}
