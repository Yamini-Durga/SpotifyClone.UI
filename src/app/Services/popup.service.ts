import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  show = new BehaviorSubject<boolean>(false);
  isSuccess = new BehaviorSubject<boolean>(true);
  responseMessage = new BehaviorSubject<string>(null);
  token = new BehaviorSubject<string>(null);
  isLoading = new BehaviorSubject<boolean>(false);
  loggedIn = new BehaviorSubject<boolean>(false);
  constructor() { }
}
