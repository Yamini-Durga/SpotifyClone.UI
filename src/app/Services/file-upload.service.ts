import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileUpload } from '../Models/FileUpload';
import { finalize } from 'rxjs/operators';
import { AddSong } from '../Models/AddSong';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';
  imageUrl = new BehaviorSubject<string>(null);
  songUrl = new BehaviorSubject<string>(null);
  imageUrlName = new BehaviorSubject<string>(null);
  songUrlName = new BehaviorSubject<string>(null);
  private apiUrl = "https://localhost:7067/api/song";

  constructor(private storage: AngularFireStorage,
    private http: HttpClient) { }
  
  uploadFileToFireStorage(fileUpload: FileUpload, fileType: string): Observable<number> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          if(fileType === 'image'){
            this.imageUrl.next(fileUpload.url);
            this.imageUrlName.next(fileUpload.name);
          }else if(fileType === 'audio'){
            this.songUrl.next(fileUpload.url);
            this.songUrlName.next(fileUpload.name);
          }
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }
  
  addSong(song: AddSong){
    return this.http.post(this.apiUrl, song);
  }
  getAllSongs(){
    return this.http.get(this.apiUrl);
  }
  deleteSong(row: any){
    // delete from storage on success
    const url = `${this.apiUrl}/${row.songId}`;
    return this.http.delete(url);
  }
  deleteFromFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
  editSong(id:number, song: AddSong){
    const url = `${this.apiUrl}/${id}`;
    return this.http.post(url, song);
  }
}
