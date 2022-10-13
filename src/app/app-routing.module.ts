import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { HomeComponent } from './Home/home/home.component';
import { NotImplementedComponent } from './not-implemented/not-implemented.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "not", component: NotImplementedComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
