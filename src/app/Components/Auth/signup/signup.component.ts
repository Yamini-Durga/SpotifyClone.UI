import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/Services/popup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
  }
  onRegister() {
    this.popupService.show.next(true); //on response
    this.popupService.isSuccess.next(false);//based on registration response status
    console.log("Registration!");
  }
}
