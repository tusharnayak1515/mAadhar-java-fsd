import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import RegisterUser from '../models/RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public name:string = "";
  public gender:string = "male";
  public dob:string = "";
  public email:string = "";
  public mobile:string = "";
  public address:string = "";
  public password:string = "";
  public error:string = '';

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) {}


  ngOnInit(): void {
    
  }

  onRegister() {
    console.log(this.password);
    const user = new RegisterUser(this.name,this.gender,this.dob,this.email,this.mobile,this.address,this.password);
    this.userService.userRegister(user).subscribe((response:any)=> {
      if(response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        this.error = '';
        this.setAuthCookie(response.token);
        this.router.navigate(['user/dashboard']);
        this.userService.setIsLoggedIn(true);
        this.userService.setUser(response.user);
      }
    },
    (error) => {
      this.error = error.error;
      this.userService.setIsLoggedIn(false);
    }
    );
  }

  private setAuthCookie(token:string): void {
    const expirationDays = 1;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    this.cookieService.set('authorization', token, expirationDate, '/');
  }
}
