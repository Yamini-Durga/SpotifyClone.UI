import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegistration } from 'src/app/Models/UserRegistration';
import { AuthService } from 'src/app/Services/auth.service';
import { PopupService } from 'src/app/Services/popup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  user: UserRegistration;

  constructor(private popupService: PopupService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPwd': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'username': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'month': new FormControl(null, [Validators.required]),
      'day': new FormControl(null, [Validators.required]),
      'year': new FormControl(null, [Validators.required]),
      'gender': new FormControl('Male', [Validators.required])
    });
  }
  comparePassword(control: FormControl): { isConfirmPwd: boolean} {
    if(this.signupForm?.touched){
      if(control?.value?.toLowerCase() === this.signupForm?.get('password')?.value?.toLowerCase())
      {
        console.log(this.signupForm.get('confirmPwd').status);
        return { "isConfirmPwd": true };
      }
    }
    return { "isConfirmPwd": false };
  }
  onRegister() {
    this.popupService.isLoading.next(true);
    this.user = {
      Name: this.signupForm.value.username,
      Email: this.signupForm.value.email,
      Password: this.signupForm.value.password,
      ConfirmPassword: this.signupForm.value.confirmPwd,
      Gender: this.signupForm.value.gender,
      Month: this.signupForm.value.month,
      Date: this.signupForm.value.day,
      Year: this.signupForm.value.year
    }
    this.authService.signup(this.user).subscribe(
      (response) => {
        this.popupService.isLoading.next(false);
        this.resetForm();
        this.popupService.show.next(true);
        this.popupService.isSuccess.next(true);
        this.popupService.responseMessage.next(response["message"]);
        this.popupService.token.next(response["data"]["token"]);
      },
      (error) => {
        this.popupService.isLoading.next(false);
        this.resetForm();
        this.popupService.isSuccess.next(false);
        this.popupService.show.next(true);
        this.popupService.responseMessage.next(error.error.message);
        this.popupService.token.next(null);
      }
    );
  }
  resetForm() {
    this.signupForm.reset();
    this.signupForm.get('gender').setValue('Male');
  }
}
