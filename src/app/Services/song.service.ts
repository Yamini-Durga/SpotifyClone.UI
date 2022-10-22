import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = "https://localhost:7067/api/song";

  constructor(private http: HttpClient) { }

  getSongs(){
    return this.http.get(this.apiUrl);
  }
  searchSongs(search: string){
    const url = `${this.apiUrl}/search/${search}`;
    return this.http.get(url);
  }
  likedSongs(){
    const url = `${this.apiUrl}/like`;
    return this.http.get(url);
  }
  likeSong(id: number){
    const url = `${this.apiUrl}/like/${id}`;
    return this.http.put(url, null);
  }
}
