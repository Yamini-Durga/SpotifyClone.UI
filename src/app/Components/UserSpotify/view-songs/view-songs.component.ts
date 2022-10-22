import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/Services/popup.service';
import { SongService } from 'src/app/Services/song.service';

@Component({
  selector: 'app-view-songs',
  templateUrl: './view-songs.component.html',
  styleUrls: ['./view-songs.component.css']
})
export class ViewSongsComponent implements OnInit {
  @Input() songsList: any;
  @Input() likedSongsIds: any;
  constructor(private songService: SongService,
    private popupService: PopupService,
    private router: Router) { }

  ngOnInit(): void {
    
  }
  onLiked(id: number){
    this.popupService.isLoading.next(true);
    this.songService.likeSong(id)
      .subscribe(
        (response) => {
          this.popupService.isLoading.next(false);
          this.popupService.show.next(false);
          this.popupService.responseMessage.next(response["message"]);
          this.popupService.token.next(null);
          this.popupService.isSuccess.next(false);
          this.router.navigate(['/userhome']);
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
  isLikedSong(id: number){
    if(this.likedSongsIds?.indexOf(id) !== -1){
      return 'likedCls';
    }
    else{
      return 'dislikeCls';
    }
  }
}
