import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AdminHomeComponent } from './Components/Admin/admin-home/admin-home.component';
import { UsersComponent } from './Components/Admin/users/users.component';
import { SongsComponent } from './Components/Admin/songs/songs.component';
import { AuthInterceptor } from './Services/authtoken.interceptor';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ViewSongsComponent } from './Components/UserSpotify/view-songs/view-songs.component';

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
    UserHomeComponent,
    AdminHomeComponent,
    UsersComponent,
    SongsComponent,
    ViewSongsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
