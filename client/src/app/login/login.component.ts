import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public mobile:string = "";
  public password:string = "";
  public error:string = '';

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    
  }

  onLogin() {
    this.userService.userLogin(this.mobile,this.password).subscribe((response:any)=> {
      if(response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        this.error = '';
        this.setAuthCookie(response.token);
        if(response?.user?.role === "admin") {
          this.router.navigate(['admin/dashboard']);
        }
        else {
          this.router.navigate(['user/dashboard']);
        }
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
