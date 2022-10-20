import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '../Models/UserRegistration';
import { ResetPasswordDto } from '../Models/ResetPasswordDto';
import { Userdata } from '../Models/Userdata';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timeoutInterval: any;
  private apiUrl = "https://localhost:7067/api/auth";

  constructor(private http: HttpClient,
    private router: Router) { }

  signup(user: UserRegistration){
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, user);
  }
  verify(email: string, token: string){
    const url = `${this.apiUrl}/verify`;
    return this.http.post(url, {
      Email: email, Token: token
    });
  }
  login(email: string, password: string){
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, {
      Email: email, Password: password
    });
  }
  getToken(email: string){
    const url = `${this.apiUrl}/forgotpassword`;
    return this.http.post(url, { Email: email });
  }
  reset(resetPwd: ResetPasswordDto){
    const url = `${this.apiUrl}/resetpassword`;
    return this.http.post(url, resetPwd);
  }
  // logout after 1 hour
  setUserInLocalStorage(user: Userdata){
    localStorage.setItem("userdata", JSON.stringify(user));
    this.runTimeoutInterval(user);
  }
  getUserFromLocalStorage(){
    const user = localStorage.getItem("userdata");
    if(user){
      return JSON.parse(user);
    }
    return null;
  }
  runTimeoutInterval(user: Userdata){
        const curTime = new Date().getTime();
        // after 1 hour
        const expirationTime = new Date().setTime(curTime + 1*60*60*1000);
        const timeInterval = expirationTime - curTime;
        this.timeoutInterval = setTimeout(() => {
          this.logout();
        }, timeInterval);
    }
    logout(){
        localStorage.removeItem('userdata');
        if(this.timeoutInterval){
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval = null;
        }
        this.router.navigate(['/login']);
    }
}
