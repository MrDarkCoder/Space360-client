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
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  personalInformation: any;

  registerForm: FormGroup;
  validationErrors: string[] = [];

  submitted: boolean = false;

  teams: any;
  subTeams: any;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  nextPage() {
    this.router.navigate(['register/verification']);

    this.submitted = true;
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      teamName: ['', Validators.required],
      subTeamName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(4)],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
      acceptTerms: [false, Validators.required],
    });

    // when password changes - confirm password should reflect
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    });
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

  handleErrorDropDown = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  changeTeam(event: any) {
    this.registerForm.get('teamName').setValue(event.target.value, {
      onlySelf: true,
    });
  }

  changeSubTeam(event: any) {
    this.registerForm.get('subTeamName').setValue(event.target.value, {
      onlySelf: true,
    });
  }

  onSubmit() {
    this.router.navigateByUrl('register/verification');
  }

  getTeams() {}
}
