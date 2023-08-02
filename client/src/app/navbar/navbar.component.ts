import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import User from '../models/User';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn:boolean = false;
  public userType:string = "";

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) {

  }

  ngOnInit(): void {
    this.userService.getIsLoggedIn().subscribe((value:boolean) => {
      this.isLoggedIn = value;
    });

    this.userService.getUser().subscribe((value:User) => {
      this.userType = value?.role;
    });
  }

  logoutUser() {
    this.cookieService.set('authorization', "", new Date(), '/');
    localStorage.removeItem("user");
    this.userService.setIsLoggedIn(false);
    this.router.navigate(['login']);
  }

}
