import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password-reset-form',
  templateUrl: './forget-password-reset-form.component.html',
})
export class ForgetPasswordResetFormComponent implements OnInit {
  resetForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}

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
      resetOTP: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    // when password changes - confirm password should reflect
    this.resetForm.controls['password'].valueChanges.subscribe(() => {
      this.resetForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  onSubmit() {}
}
