import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/Services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  isSuccess: boolean = true;

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.isSuccess.subscribe(value => {
      this.isSuccess = value;
    });
  }
  onClose() {
    this.popupService.show.next(false);
  }
  onVerify() {
    console.log("verify!");
    this.onClose();
    // route to verify
  }
}
