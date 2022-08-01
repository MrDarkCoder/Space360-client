import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  validationErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    let d = {
      usernameOrMailAddress: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.memberService.login(d).subscribe({
      next: (response) => {
        console.log('[COMP - LOGIN]', response);
        this.toastr.success('LoggedIn', 'Login');
      },
    });
  }
}
