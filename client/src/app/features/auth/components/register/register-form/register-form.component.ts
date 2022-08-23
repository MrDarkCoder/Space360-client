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
import { SubTeam } from 'src/app/models/forms/SubTeam';
import { Team } from 'src/app/models/forms/Team';
import { MembersService } from 'src/app/services/members.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  personalInformation: any;

  registerForm: FormGroup;
  validationErrors: string[] = [];

  currentTeamId = 0;
  currentSubTeamId = 0;

  submitted: boolean = false;

  teams: Team[];
  subTeams: SubTeam[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private teamService: TeamService,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getTeams();
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
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
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

    this.currentTeamId = this.teams.find(
      (t) => t.teamName == this.registerForm.value.teamName
    ).teamId;

    this.toastr.info('Please wait, Getting Sub-Teams Details', 'SubTeam');

    this.teamService.getSubTeams(this.currentTeamId).subscribe({
      next: (response: SubTeam[]) => {
        console.log('[Sub Team]', response);
        this.subTeams = response;
      },
    });
  }

  changeSubTeam(event: any) {
    this.registerForm.get('subTeamName').setValue(event.target.value, {
      onlySelf: true,
    });

    this.currentSubTeamId = this.subTeams.find(
      (t) => t.subTeamName == this.registerForm.value.subTeamName
    ).subTeamId;
  }

  onSubmit() {
    let d = {
      ...this.registerForm.value,
      userTeamId: this.currentTeamId,
      userSubTeamId: this.currentSubTeamId,
      acceptTerms: Boolean(this.registerForm.value['acceptTerms']),
    };

    console.log('[REG FORM]', d);

    this.memberService.register(d).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message, 'Regsitered');
        this.router.navigateByUrl('register/verification');
      },
      error: (err) => {
        console.log('[REG - ERR]', err);
        this.toastr.error('Something Went Worng', 'Register');
      },
    });

    // let teamId = this.teams.find()
  }

  getTeams() {
    this.toastr.info('Please wait, Getting Teams Details', 'Team');
    this.teamService.getTeams().subscribe({
      next: (response: Team[]) => {
        this.teams = response;
        console.log('[COMPONENT] - REGISTER', response);
      },
    });
  }
}
