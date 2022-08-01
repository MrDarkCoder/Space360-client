import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password-text-form',
  templateUrl: './forget-password-text-form.component.html',
})
export class ForgetPasswordTextFormComponent implements OnInit {
  accountform: FormGroup;
  validationErrors: string[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.accountform = this.fb.group({
      text: ['', Validators.required],
    });
  }

  onSubmit() {
    this.router.navigateByUrl('forget-password/forget-password-reset-form');
  }
}
