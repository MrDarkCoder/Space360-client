import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-forget-password-reset-form',
  templateUrl: './forget-password-reset-form.component.html',
})
export class ForgetPasswordResetFormComponent implements OnInit {
  resetForm: FormGroup;
  validationErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : {
            isMatching: true,
          };
    };
  }

  initializeForm() {
    this.resetForm = this.fb.group({
      otp: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    // when password changes - confirm password should reflect
    this.resetForm.controls['password'].valueChanges.subscribe(() => {
      this.resetForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  onSubmit() {
    this.memberService.resetPassword(this.resetForm.value).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message, 'Reset Succesfull');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log('[RESEt Pwd] - Fail', err);
        this.toastr.error(err.message, 'Reset Failure');
      },
    });
  }
}
