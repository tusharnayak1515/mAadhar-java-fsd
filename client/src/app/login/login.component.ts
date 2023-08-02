import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public mobile:string = "";
  public password:string = "";
  public error:string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    
  }

  onLogin() {
    this.userService.userLogin(this.mobile,this.password).subscribe((response:any)=> {
      if(response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        this.error = '';
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
}
