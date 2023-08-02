import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { tap } from 'rxjs';

export const adminGuard = () => {
  const router = inject(Router);
  const userService: UserService = inject(UserService);
  return userService.getIsLoggedIn().pipe(
    tap((value:boolean) => {
      if (value) {
        const user = JSON.parse(localStorage.getItem("user")!);
        if(user?.role === "admin") {
          return true;
        }
        router.navigate(['user/dashboard']);
        return false;
      } else {
        router.navigate(['login']);
        return false;
      }
    })
  );
};
