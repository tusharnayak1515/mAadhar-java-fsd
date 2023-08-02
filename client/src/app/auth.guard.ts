import { Router } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard = () => {
  const router = inject(Router);
  const userService: UserService = inject(UserService);
  return userService.getIsLoggedIn().pipe(
    tap((value:boolean) => {
      if (value) {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    })
  );
};
