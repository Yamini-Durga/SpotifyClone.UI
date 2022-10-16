import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/Services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  isSuccess: boolean = true;
  responseMessage: string;
  token: string;
  loggedIn: boolean;
  constructor(private popupService: PopupService,
    private router: Router) { }

  ngOnInit(): void {
    this.popupService.isSuccess.subscribe(value => { this.isSuccess = value; });
    this.popupService.responseMessage.subscribe(value => { this.responseMessage = value; });
    this.popupService.token.subscribe(value => { this.token = value; });
    this.popupService.loggedIn.subscribe(value => { this.loggedIn = value; });
  }
  onClose() {
    this.popupService.show.next(false);
    if(this.loggedIn){
      this.router.navigate(['/userhome']);
    }
  }
  onVerify() {
    this.onClose();
    this.router.navigate(['/verify']);
  }
}
