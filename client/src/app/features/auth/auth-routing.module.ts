import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInAuthGuardGuard } from 'src/app/guards/logged-in-auth-guard.guard';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { ForgetPasswordResetFormComponent } from './components/forget-password/forget-password-reset-form/forget-password-reset-form.component';
import { ForgetPasswordTextFormComponent } from './components/forget-password/forget-password-text-form/forget-password-text-form.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterFormComponent } from './components/register/register-form/register-form.component';
import { RegisterComponent } from './components/register/register.component';
import { VerificationComponent } from './components/register/verification/verification.component';

// need to write gaurd to back to home

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInAuthGuardGuard],
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedInAuthGuardGuard],
    children: [
      {
        path: 'register-form',
        component: RegisterFormComponent,
        title: 'Register Form',
      },
      {
        path: 'verification',
        component: VerificationComponent,
        title: 'Verification Token',
      },
      { path: '', redirectTo: 'register-form', pathMatch: 'full' },
    ],
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    children: [
      {
        path: 'forget-password-account-form',
        component: ForgetPasswordTextFormComponent,
        title: 'Reset Form',
      },
      {
        path: 'forget-password-reset-form',
        component: ForgetPasswordResetFormComponent,
        title: 'Reset Form',
      },
      {
        path: '',
        redirectTo: 'forget-password-account-form',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInAuthGuardGuard],
    title: 'Home',
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
