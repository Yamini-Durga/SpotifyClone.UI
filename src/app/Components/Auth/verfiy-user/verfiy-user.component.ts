import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { PopupService } from 'src/app/Services/popup.service';

@Component({
  selector: 'app-verfiy-user',
  templateUrl: './verfiy-user.component.html',
  styleUrls: ['./verfiy-user.component.css']
})
export class VerfiyUserComponent implements OnInit {
  verifyForm: FormGroup;
  constructor(private popupService: PopupService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.verifyForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'token': new FormControl(null, Validators.required)
    });
  }
    onVerify(){
      this.popupService.isLoading.next(true);
      this.authService.verify(this.verifyForm.value.email, this.verifyForm.value.token)
        .subscribe(
          (response) => {
            this.popupService.isLoading.next(false);
            this.resetForm();
            this.popupService.show.next(true);
            this.popupService.isSuccess.next(false);
            this.popupService.responseMessage.next(response["message"]);
            this.popupService.token.next(null);
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
      this.verifyForm.reset();
    }
}
