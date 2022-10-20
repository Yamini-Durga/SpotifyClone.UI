import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  user: any;
  showLogout = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalStorage();
  }
  onProfilename(){
    this.showLogout = !this.showLogout;
  }
  onLogout(){
    this.authService.logout();
  }
}
