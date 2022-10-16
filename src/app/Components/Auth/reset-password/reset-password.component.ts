import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { PopupService } from 'src/app/Services/popup.service';
import { ResetPasswordDto } from '../../../Models/ResetPasswordDto';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  resetPwd: ResetPasswordDto;

  constructor(private popupService: PopupService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPwd': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'token': new FormControl(null, [Validators.required]),
    });
  }
  onReset(){
    this.popupService.isLoading.next(true);
    this.resetPwd = {
      Email: this.resetForm.value.email,
      Token: this.resetForm.value.token,
      Password: this.resetForm.value.password,
      ConfirmPassword: this.resetForm.value.confirmPwd
    };
    this.authService.reset(this.resetPwd)
      .subscribe(
        (response) => {
          this.popupService.isLoading.next(false);
          this.resetFormObj();
          this.popupService.show.next(true);
          this.popupService.isSuccess.next(false);
          this.popupService.responseMessage.next(response["message"]);
          this.popupService.token.next(null);
          this.popupService.loggedIn.next(false);
        },
        (error) => {
          this.popupService.isLoading.next(false);
          this.resetFormObj();
          this.popupService.isSuccess.next(false);
          this.popupService.show.next(true);
          this.popupService.responseMessage.next(error.error.message);
          this.popupService.token.next(null);
          this.popupService.loggedIn.next(false);
        }
      );
    }
  resetFormObj() {
      this.resetForm.reset();
    }
}
