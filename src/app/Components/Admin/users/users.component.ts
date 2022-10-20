import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateUser } from 'src/app/Models/UpdateUser';
import { PopupService } from 'src/app/Services/popup.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userdata: any;
  count: number;
  showEditBox = false;
  editForm: FormGroup;
  editUserId: number;
  errorMsg = null;
  successMsg = null;
  showDeleteBox = false;

  constructor(private userService: UserService,
    private popupService: PopupService) { }

  ngOnInit(): void {
    this.getAllusers();
  }
  getAllusers(){
    this.popupService.isLoading.next(true);
    this.userService.getAllUsers()
      .subscribe(
        (response) => {
          this.popupService.isLoading.next(false);
          this.popupService.show.next(false);
          this.count = response["data"].totalUsers;
          this.userdata = response["data"].users;
        },
        (error) => {
          this.popupService.isLoading.next(false);
          this.popupService.show.next(true);
          this.popupService.isSuccess.next(false);
          if(error.status === 401){
            this.popupService.responseMessage.next("You are not allowed to view this portal");
          }
          else{
            this.popupService.responseMessage.next(error.error.message);
          }
          this.popupService.token.next(null);
        }
      );
  }
  onDelete(row: any){
    this.popupService.isLoading.next(true);
    this.userService.deleteUser(row.userId).subscribe(
      (response) => {
        this.popupService.isLoading.next(false);
        this.successMsg = response["message"];
        this.showDeleteBox = true;
      },
      (error) => {
        this.popupService.isLoading.next(false);
        this.errorMsg = error.error?.message;
        this.showDeleteBox = true;
      }
    );
  }
  onEdit(row: any){
    this.editForm = new FormGroup({
      'email': new FormControl(row.email, [Validators.required, Validators.email]),
      'username': new FormControl(row.name, [Validators.required, Validators.minLength(2)]),
      'month': new FormControl(row.month, [Validators.required]),
      'day': new FormControl(row.date, [Validators.required]),
      'year': new FormControl(row.year, [Validators.required]),
      'gender': new FormControl(row.gender, [Validators.required])
    });
    this.showEditBox = true;
    this.editUserId = row.userId;
  }
  onClose(){
    this.showEditBox = false;
    this.showDeleteBox = false;
    if(this.successMsg){
      this.getAllusers();
    }
  }
  onEditUser(){
    let user: UpdateUser = {
      Name: this.editForm.value.username,
      Email: this.editForm.value.email,
      Gender: this.editForm.value.gender,
      Month: this.editForm.value.month,
      Date: this.editForm.value.day,
      Year: this.editForm.value.year
    };
    this.popupService.isLoading.next(true);
    this.userService.updateUser(this.editUserId, user).subscribe(
      (response) => {
        this.popupService.isLoading.next(false);
        this.successMsg = response["message"];
      },
      (error) => {
        this.popupService.isLoading.next(false);
        this.errorMsg = error.error?.message;
      }
    );
  }
}
