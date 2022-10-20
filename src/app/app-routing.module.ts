import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './Components/Admin/admin-home/admin-home.component';
import { SongsComponent } from './Components/Admin/songs/songs.component';
import { UsersComponent } from './Components/Admin/users/users.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { ResetPasswordComponent } from './Components/Auth/reset-password/reset-password.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { VerfiyUserComponent } from './Components/Auth/verfiy-user/verfiy-user.component';
import { HomeComponent } from './Components/home/home.component';
import { NotImplementedComponent } from './Components/not-implemented/not-implemented.component';
import { UserHomeComponent } from './Components/UserSpotify/user-home/user-home.component';
import { AuthGaurd } from './Services/authgaurd.service';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "not", component: NotImplementedComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "verify", component: VerfiyUserComponent },
  { path: "reset", component: ResetPasswordComponent },
  { path: "userhome", component: UserHomeComponent,
    canActivate: [AuthGaurd] },
  { path: "adminportal", component: AdminHomeComponent, 
    canActivate: [AuthGaurd],
    children: [
      { path: "", component: UsersComponent },
      { path: "songs", component: SongsComponent }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
