import { Component } from '@angular/core';
import { PopupService } from './Services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show: boolean = true;
  isLoading: boolean = false;
  constructor(private popupService: PopupService) { }
  ngOnInit(): void {
    this.popupService.show.subscribe(value => {
      this.show = value;
    });
    this.popupService.isLoading.subscribe(value => {
      this.isLoading = value;
    });
  }
}
