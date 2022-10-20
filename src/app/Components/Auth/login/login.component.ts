import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userdata } from 'src/app/Models/Userdata';
import { AuthService } from 'src/app/Services/auth.service';
import { PopupService } from 'src/app/Services/popup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showForgot = false;
  token: string;
  loginForm: FormGroup;
  emailStr = '';
  errorMsg: string;

  constructor(private authService: AuthService,
    private popupService: PopupService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }
  onForgot() {
    this.showForgot = true;
  }
  onClose() {
    this.showForgot = false;
    if(this.token){
      this.router.navigate(['/reset']);
    }
  }
  onGetToken() {
    this.popupService.isLoading.next(true);
    this.authService.getToken(this.emailStr)
      .subscribe(
        (response) => {
            this.token = response["data"]["token"];
            this.errorMsg = null;
            this.popupService.isLoading.next(false);
        },
        (error) => {
          this.popupService.isLoading.next(false);
            this.errorMsg = error.error.message;
        }
      )
  }
  onLogin() {
    this.popupService.isLoading.next(true);
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (response) => {
          this.popupService.isLoading.next(false);
          let user: Userdata = response["data"];
          this.authService.setUserInLocalStorage(user);
          this.resetForm();
          this.popupService.show.next(true);
          this.popupService.isSuccess.next(false);
          this.popupService.responseMessage.next(response["message"]);
          this.popupService.token.next(null);
          this.popupService.loggedIn.next(true);
        },
        (error) => {
          this.popupService.isLoading.next(false);
          this.resetForm();
          this.popupService.isSuccess.next(false);
          this.popupService.show.next(true);
          this.popupService.responseMessage.next(error.error.message);
          this.popupService.token.next(null);
          this.popupService.loggedIn.next(false);
        }
      );
  }
  resetForm() {
    this.loginForm.reset();
  }
}
