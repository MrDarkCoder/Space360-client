import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-forget-password-text-form',
  templateUrl: './forget-password-text-form.component.html',
})
export class ForgetPasswordTextFormComponent implements OnInit {
  accountform: FormGroup;
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

  initializeForm() {
    this.accountform = this.fb.group({
      text: ['', Validators.required],
    });
  }

  onSubmit() {
    let d = {
      usernameOrMailAddress: this.accountform.value.text,
    };

    this.memberService.resetAccountCheck(d).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message, 'Reset Mail');
        this.router.navigateByUrl('forget-password/forget-password-reset-form');
      },
      error: (err) => {
        console.log('[RESET ACC ERR]', err);
        this.toastr.error('Something Went Wrong', 'Reset Account');
      },
    });
  }
}
