import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '../Models/UserRegistration';
import { ResetPasswordDto } from '../Models/ResetPasswordDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://localhost:7067/api/auth";
  constructor(private http: HttpClient) { }

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
}
