import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepsModule } from 'primeng/steps';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgOtpInputModule } from 'ng-otp-input';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerificationComponent } from './components/register/verification/verification.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RegisterFormComponent } from './components/register/register-form/register-form.component';
import { ForgetPasswordTextFormComponent } from './components/forget-password/forget-password-text-form/forget-password-text-form.component';
import { ForgetPasswordResetFormComponent } from './components/forget-password/forget-password-reset-form/forget-password-reset-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerificationComponent,
    ForgetPasswordComponent,
    RegisterFormComponent,
    ForgetPasswordTextFormComponent,
    ForgetPasswordResetFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    StepsModule,
    NgOtpInputModule,
  ],
})
export class AuthModule {}
