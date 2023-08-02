import { Component, OnInit } from '@angular/core';
import User from '../models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public user:User|any = null;

  constructor(private userService:UserService) {

  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((value:User) => {
      this.user = value;
    });
  }

}
