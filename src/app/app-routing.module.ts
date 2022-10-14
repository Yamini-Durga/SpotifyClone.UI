import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { ResetPasswordComponent } from './Components/Auth/reset-password/reset-password.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { VerfiyUserComponent } from './Components/Auth/verfiy-user/verfiy-user.component';
import { HomeComponent } from './Components/home/home.component';
import { NotImplementedComponent } from './Components/not-implemented/not-implemented.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "not", component: NotImplementedComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "verify", component: VerfiyUserComponent },
  { path: "reset", component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
