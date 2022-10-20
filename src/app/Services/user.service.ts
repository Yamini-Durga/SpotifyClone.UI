import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUser } from '../Models/UpdateUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "https://localhost:7067/api/users";

  constructor(private http: HttpClient) { }
  getAllUsers(){
    return this.http.get(this.apiUrl);
  }
  updateUser(id: number, user: UpdateUser){
    const url = `${this.apiUrl}/${id}`;

    return this.http.put(url, user);
  }
  deleteUser(id: number){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
