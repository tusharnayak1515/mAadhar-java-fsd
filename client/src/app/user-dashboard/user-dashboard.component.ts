import { Component, OnInit } from '@angular/core';
import User from '../models/User';
import { UserService } from '../user.service';
import { AadharService } from '../aadhar.service';
import Aadhar from '../models/Aadhar';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  public myuser: User | any = null;
  public user: User | any = null;
  public aadhar: Aadhar | any = null;
  public dp: string | any = null;
  public file: File | any = null;
  public error:string = '';

  constructor(
    private userService: UserService,
    private aadharService: AadharService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((value: User) => {
      this.user = value;
      this.myuser = JSON.parse(localStorage.getItem('user')!);
    });

    this.aadharService.getMyAadhar().subscribe(
      (response: any) => {
        if (response.success) {
          this.aadharService.setAadhar(response.aadhar);
          this.aadharService.getAadhar().subscribe((value: Aadhar) => {
            this.aadhar = value;
          });
        }
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  onDpChange(e: any) {
    e.preventDefault();
    if (e.target.files?.length !== 0) {
      this.dp = e.target.files && URL.createObjectURL(e.target.files[0]);
      this.file = e.target.files && e.target.files[0];
    }
  }

  updateProfile() {
    if(this.user?.mobile?.toString().length !== 10) {
      this.error = "Mobile number must be 10 digits";
    }
    else {
      this.userService.updateProfile(this.user).subscribe(
        (response:any)=> {
          if(response.success) {
            localStorage.setItem("user", JSON.stringify(response.user));
            this.userService.setUser(response.user);
            this.error = '';
          }
        },
        (error) => {
          this.error = error.error;
        }
      )
    }
  }

  uploadDp() {
    const data = new FormData();
    data.append('dp', this.file);
    this.userService.uploadDp(data).subscribe(
      (response: any) => {
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.userService.setUser(response.user);
          this.file = null;
        }
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  applyNewAadhar() {
    this.aadharService.applyNewAadhar(new Date().toLocaleDateString()).subscribe(
      (response: any) => {
        if (response.success) {
          this.aadharService.setAadhar(response.aadhar);
          this.aadharService.getAadhar().subscribe((value: Aadhar) => {
            this.aadhar = value;
          });
        }
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  applyDuplicateAadhar() {
    this.aadharService.applyDuplicateAadhar().subscribe(
      (response: any) => {
        if (response.success) {
          this.aadharService.setAadhar(response.aadhar);
          this.aadharService.getAadhar().subscribe((value: Aadhar) => {
            this.aadhar = value;
          });
        }
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }
}
