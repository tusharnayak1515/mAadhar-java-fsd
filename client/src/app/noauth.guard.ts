import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { catchError, of, map } from 'rxjs';

export const noAuthGuard = () => {
  const router = inject(Router);
  const userService: UserService = inject(UserService);
  return userService.getIsLoggedIn().pipe(
    map((value:boolean) => {
      if (value) {
        const user = JSON.parse(localStorage.getItem("user")!);
        if(user?.role === "admin") {
          router.navigate(['admin/dashboard']);
        }
        else {
          router.navigate(['user/dashboard']);
        }
        return false;
      } else {
        return true;
      }
    },
    catchError((error: any) => {
      console.error('Error checking login status:', error);
      router.navigate(['login']);
      return of(false);
    })
    )
  );
};
