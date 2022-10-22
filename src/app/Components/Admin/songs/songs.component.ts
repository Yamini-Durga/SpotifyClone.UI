import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddSong } from 'src/app/Models/AddSong';
import { FileUpload } from 'src/app/Models/FileUpload';
import { FileUploadService } from 'src/app/Services/file-upload.service';
import { PopupService } from 'src/app/Services/popup.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songdata: any;
  count: number;
  selectedFile: File;
  currentFileUpload: FileUpload;
  percentage: number;
  showAddBox = false;
  addSongForm: FormGroup;
  uploadedSong = false;
  errorMsg = null;
  successMsg = null;
  showDeleteBox = false;
  showEditBox = false;
  editRowData: any;
  uploadedImage = false;
  srcImageUrl: string;
  srcSongUrl: string;
  editSongForm: FormGroup;
  
  constructor(private fileUploadService: FileUploadService,
    private popupService: PopupService) { }

  ngOnInit(): void {
    this.addSongForm = new FormGroup({
      'songname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'artistname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'duration': new FormControl(null, Validators.required)
    });
    this.getAllSongs();
  }
  getAllSongs(){
    this.popupService.isLoading.next(true);
    this.fileUploadService.getAllSongs()
      .subscribe(
        (response) => {
          this.popupService.isLoading.next(false);
          this.popupService.show.next(false);
          this.songdata = response["data"];
          this.count = response["data"].length;
        },
        (error) => {
          this.popupService.isLoading.next(false);
          this.popupService.show.next(true);
          this.popupService.isSuccess.next(false);
          if(error.status === 401 || error.status === 403){
            this.popupService.responseMessage.next("You are not allowed to view this portal");
            this.errorMsg = "You are not allowed to view this portal";
          }
          else{
            this.popupService.responseMessage.next(error.error.message);
          }
          this.popupService.token.next(null);
        }
      );
  }
  onEdit(row: any){
    this.srcImageUrl = row.imageUrl;
    this.srcSongUrl = row.songUrl;
    this.editSongForm = new FormGroup({
      'songname': new FormControl(row.name, [Validators.required, Validators.minLength(2)]),
      'artistname': new FormControl(row.artist, [Validators.required, Validators.minLength(2)]),
      'duration': new FormControl(row.duration, Validators.required)
    });
    this.editRowData = row;
    this.showEditBox = true;
  }
  onDelete(row: any){
    this.popupService.isLoading.next(true);
    this.fileUploadService.deleteSong(row).subscribe(
      (response) => {
        this.fileUploadService.deleteFromFileStorage(row.imageUrlName);
        this.fileUploadService.deleteFromFileStorage(row.songUrlName);
        this.popupService.isLoading.next(false);
        this.successMsg = response["message"];
        this.showDeleteBox = true;
      },
      (error) => {
        this.popupService.isLoading.next(false);
        this.errorMsg = error.error?.message;
        this.showDeleteBox = true;
        if(error.status === 401 || error.status === 403){
            this.errorMsg = "You are not allowed to view this portal";
          }
      }
    );
  }
  selectFile(event): void {
    this.selectedFile = event.target.files[0];
  }
  onAddSong(){
    this.showAddBox = true;
  }
  onClose(){
    this.showAddBox = false;
    this.showDeleteBox = false;
    this.showEditBox = false;
    this.uploadedImage = false;
    this.uploadedSong = false;
    if(this.successMsg){
      this.getAllSongs();
      this.successMsg = null;
    }
    this.errorMsg = null;
    this.addSongForm.reset();
    this.editSongForm.reset();
  }
  upload(fileType: string): void {
    this.currentFileUpload = null;
    const file = this.selectedFile;
    this.selectedFile = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.fileUploadService.uploadFileToFireStorage(this.currentFileUpload, fileType).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        if(fileType === 'audio'){
          this.uploadedSong = true;
          if(this.showEditBox){
            this.fileUploadService.songUrl.subscribe((val) => this.srcSongUrl = val);
          }
        }
        if(fileType === 'image'){
          this.uploadedImage = true;
          if(this.showEditBox){
            this.fileUploadService.imageUrl.subscribe((val) => this.srcImageUrl = val);
          }
        }
      },
      error => {
        console.log(error);
        if(fileType === 'audio'){
          this.uploadedSong = false;
        }
        if(fileType === 'image'){
          this.uploadedImage = false;
        }
      }
    );
  }
  onAddNewSong(){
    let imageUrl, songUrl, imageUrlName, songUrlName;
    this.fileUploadService.imageUrl.subscribe((val) => imageUrl = val);
    this.fileUploadService.songUrl.subscribe((val) => songUrl = val);
    this.fileUploadService.imageUrlName.subscribe((val) => imageUrlName = val);
    this.fileUploadService.songUrlName.subscribe((val) => songUrlName = val);
    let song: AddSong = {
      Name: this.addSongForm.value.songname,
      Artist: this.addSongForm.value.artistname,
      Duration: this.addSongForm.value.duration,
      ImageUrl: imageUrl,
      SongUrl: songUrl,
      ImageUrlName: imageUrlName,
      SongUrlName: songUrlName
    }
    this.popupService.isLoading.next(true);
    this.fileUploadService.addSong(song).subscribe(
      (response) => {
        this.popupService.isLoading.next(false);
        this.successMsg = response["message"];
        this.fileUploadService.imageUrl.next(null);
        this.fileUploadService.songUrl.next(null);
        this.fileUploadService.imageUrlName.next(null);
        this.fileUploadService.songUrlName.next(null);
        this.onClose();
      },
      (error) => {
        this.popupService.isLoading.next(false);
        this.errorMsg = error.error?.message;
        this.fileUploadService.imageUrl.next(null);
        this.fileUploadService.songUrl.next(null);
        this.fileUploadService.imageUrlName.next(null);
        this.fileUploadService.songUrlName.next(null);
        if(error.status === 401 || error.status === 403){
            this.popupService.responseMessage.next("You are not allowed to view this portal");
            this.errorMsg = "You are not allowed to view this portal";
          }
      }
    );
  }
  onEditNewSong(){
    let imageUrl = this.editRowData.imageUrl,
     songUrl = this.editRowData.songUrl, 
     imageUrlName = this.editRowData.imageUrlName,
      songUrlName = this.editRowData.songUrlName;
    if(this.uploadedImage){
      this.fileUploadService.imageUrl.subscribe((val) => imageUrl = val);
      this.fileUploadService.imageUrlName.subscribe((val) => imageUrlName = val);
    }
    if(this.uploadedSong){
      this.fileUploadService.songUrl.subscribe((val) => songUrl = val);
      this.fileUploadService.songUrlName.subscribe((val) => songUrlName = val);
    }
    let song: AddSong = {
      Name: this.editSongForm.value.songname,
      Artist: this.editSongForm.value.artistname,
      Duration: this.editSongForm.value.duration,
      ImageUrl: imageUrl,
      SongUrl: songUrl,
      ImageUrlName: imageUrlName,
      SongUrlName: songUrlName
    }
    this.popupService.isLoading.next(true);
    this.fileUploadService.editSong(this.editRowData.songId, song).subscribe(
      (response) => {
        this.popupService.isLoading.next(false);
        this.successMsg = response["message"];
        this.fileUploadService.imageUrl.next(null);
        this.fileUploadService.songUrl.next(null);
        this.fileUploadService.imageUrlName.next(null);
        this.fileUploadService.songUrlName.next(null);
        this.onClose();
      },
      (error) => {
        this.popupService.isLoading.next(false);
        this.errorMsg = error.error?.message;
        this.fileUploadService.imageUrl.next(null);
        this.fileUploadService.songUrl.next(null);
        this.fileUploadService.imageUrlName.next(null);
        this.fileUploadService.songUrlName.next(null);
        if(error.status === 401 || error.status === 403){
            this.popupService.responseMessage.next("You are not allowed to view this portal");
            this.errorMsg = "You are not allowed to view this portal";
          }
      }
    );
  }
}
