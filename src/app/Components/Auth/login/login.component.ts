import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showForgot = false;
  token: string = "token here";
  isSuccess = true;
  constructor() { }

  ngOnInit(): void {
  }
  onForgot() {
    this.showForgot = true;
  }
  onClose() {
    this.showForgot = false;
  }
  onReset() {
    console.log("reset!");
    this.onClose();
    // route to reset
  }
}
