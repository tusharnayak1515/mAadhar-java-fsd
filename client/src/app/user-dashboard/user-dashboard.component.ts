import { Component, OnInit } from '@angular/core';
import User from '../models/User';
import { UserService } from '../user.service';
import { AadharService } from '../aadhar.service';
import Aadhar from '../models/Aadhar';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public user:User|any = null;
  public aadhar:Aadhar|any = null;

  constructor(private userService:UserService, private aadharService: AadharService) {

  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((value:User) => {
      this.user = value;
    });

    this.aadharService.getMyAadhar().subscribe((response:any)=> {
      if(response.success) {
        this.aadhar = response.aadhar;
      }
    },
    (error) => {
      console.log(error);
    }
    );
  }



}
