import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { PopupService } from 'src/app/Services/popup.service';
import { SongService } from 'src/app/Services/song.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  showLogout = false;
  user: any;
  listOfSongs: any;
  likedSongs: any;
  ifSearch = false;
  @ViewChild("searchStr") searchStr: ElementRef;

  constructor(private authService: AuthService,
    private songService: SongService,
    private popupService: PopupService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalStorage();
    this.onHome();
  }
  onProfilename(){
    this.showLogout = !this.showLogout;
  }
  onLogout(){
    this.authService.logout();
  }
  onHome(){
    this.ifSearch = false;
    this.popupService.isLoading.next(true);
    this.onLikedSongs('');
    this.songService.getSongs()
      .subscribe(
        (response) => {
          this.popupService.isLoading.next(false);
          this.popupService.show.next(false);
          this.listOfSongs = response["data"];
        },
        (error) => {
          this.popupService.isLoading.next(false);
          this.popupService.show.next(true);
          this.popupService.isSuccess.next(false);
          this.popupService.responseMessage.next(error.error.message);
          this.popupService.token.next(null);
        }
      );
  }
  onSearch(){
    this.listOfSongs = null;
    this.ifSearch = true;
  }
  onSearchStr(){
    let val = this.searchStr.nativeElement.value;
    this.popupService.isLoading.next(true);
    this.onLikedSongs('');
    this.songService.searchSongs(val)
      .subscribe(
        (response) => {
          this.popupService.isLoading.next(false);
          this.popupService.show.next(false);
          this.listOfSongs = response["data"];
        },
        (error) => {
          this.popupService.isLoading.next(false);
          this.popupService.show.next(true);
          this.popupService.isSuccess.next(false);
          this.popupService.responseMessage.next(error.error.message);
          this.popupService.token.next(null);
        }
      );
  }
  onLikedSongs(str: string){
    this.ifSearch = false;
    this.popupService.isLoading.next(true);
    this.songService.likedSongs()
      .subscribe(
        (response) => {
          let songIds = [];
          response["data"].map(s => songIds.push(s.songId));
          this.likedSongs = songIds;
          this.popupService.isLoading.next(false);
          this.popupService.show.next(false);
          if(str === 'likeTab'){
            this.listOfSongs = response["data"];
          }
        },
        (error) => {
          this.popupService.isLoading.next(false);
          this.popupService.show.next(true);
          this.popupService.isSuccess.next(false);
          this.popupService.responseMessage.next(error.error.message);
          this.popupService.token.next(null);
        }
      );
  }
}
