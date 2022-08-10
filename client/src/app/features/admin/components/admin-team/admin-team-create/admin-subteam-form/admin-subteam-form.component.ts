import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/models/forms/Team';
import { SubteamService } from 'src/app/services/subteam.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin-subteam-form',
  templateUrl: './admin-subteam-form.component.html',
})
export class AdminSubteamFormComponent implements OnInit {
  subteamForm: FormGroup;
  teams = [];

  currentTeamId = 0;
  submited: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private teamService: TeamService,
    private subteamService: SubteamService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getTeams();
  }

  initializeForm() {
    this.subteamForm = this.fb.group({
      teamName: ['', Validators.required],
      subTeamName: ['', Validators.required],
    });
  }

  changeTeam(event: any) {
    this.subteamForm.get('teamName').setValue(event.target.value, {
      onlySelf: true,
    });

    this.currentTeamId = this.teams.find(
      (t) => t.teamName == this.subteamForm.value.teamName
    ).teamId;
  }

  handleErrorDropDown = (controlName: string, errorName: string) => {
    return this.subteamForm.controls[controlName].hasError(errorName);
  };

  getTeams() {
    this.teamService.getTeams().subscribe({
      next: (respone: Team[]) => {
        this.teams = respone;
      },
    });
  }

  onSubmit() {
    this.submited = true;
    let d = {
      mainTeamId: this.currentTeamId,
      subTeamName: this.subteamForm.value.subTeamName,
    };
    this.subteamService.createSubTeam(d).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.subteamForm.reset();
        this.router.navigateByUrl('admin/team');
      },
    });
  }
}
