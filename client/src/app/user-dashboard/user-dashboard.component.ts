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
  public user: User | any = null;
  public aadhar: Aadhar | any = null;
  public dp: string | any = null;
  public file: File | any = null;

  constructor(
    private userService: UserService,
    private aadharService: AadharService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((value: User) => {
      this.user = value;
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

  uploadDp() {
    const data = new FormData();
    data.append("dp", this.file);
    this.userService.uploadDp(data).subscribe(
      (response:any)=> {
        if(response.success) {
          localStorage.setItem("user", JSON.stringify(response.user));
          this.userService.setUser(response.user);
        }
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  applyNewAadhar() {
    this.aadharService.applyNewAadhar(new Date().toDateString()).subscribe(
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
