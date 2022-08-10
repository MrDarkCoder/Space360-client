import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin-team-form',
  templateUrl: './admin-team-form.component.html',
})
export class AdminTeamFormComponent implements OnInit {
  teamForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
    });
  }

  onSubmit() {
    this.teamService.createTeam(this.teamForm.value).subscribe({
      next: (response: any) => {
        this.toastr.success(response?.message);
        this.teamForm.reset();
        this.router.navigateByUrl('/admin/team/create/sub-team-form');
      },
    });
  }
}
