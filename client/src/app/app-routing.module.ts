import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { authGuard } from './auth.guard';
import { noAuthGuard } from './noauth.guard';
import { adminGuard } from './admin.guard';

const routes: Routes = [
  {path: '', redirectTo: "/user/dashboard", pathMatch: "full"},
  {path: 'register', component: RegisterComponent, canActivate: [noAuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [noAuthGuard]},
  {path: 'admin/dashboard', component: AdminDashboardComponent , canActivate: [adminGuard]},
  {path: 'user/dashboard', component: UserDashboardComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
