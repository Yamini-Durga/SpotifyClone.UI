import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { NotImplementedComponent } from './Components/not-implemented/not-implemented.component';
import { SignupComponent } from './Components/Auth/signup/signup.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { VerfiyUserComponent } from './Components/Auth/verfiy-user/verfiy-user.component';
import { ResetPasswordComponent } from './Components/Auth/reset-password/reset-password.component';
import { PopupComponent } from './Components/popup/popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './Components/loading-spinner/loading-spinner.component';
import { UserHomeComponent } from './Components/UserSpotify/user-home/user-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotImplementedComponent,
    SignupComponent,
    LoginComponent,
    VerfiyUserComponent,
    ResetPasswordComponent,
    PopupComponent,
    LoadingSpinnerComponent,
    UserHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
