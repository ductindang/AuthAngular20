import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Login } from './component/login/login';
import { ConfirmOtp } from './component/confirmotp/confirmotp';
import { Register } from './component/register/register';
import { User } from './component/user/user';
import { UpdatePassword } from './component/update-password/update-password';
import { ForgetPassword } from './component/forget-password/forget-password';
import { ResetPassword } from './component/reset-password/reset-password';
import { Customer } from './component/customer/customer';
import { Userrole } from './component/userrole/userrole';
import { authGuard } from './_guard/auth-guard';
import { resetPasswordGuard } from './_guard/reset-password-guard';

export const routes: Routes = [
    {path:'', component:Home, canActivate:[authGuard]},
    {path:'register', component:Register},
    {path:'login', component:Login},
    {path:'confirmotp', component:ConfirmOtp},
    {path:'user', component:User, canActivate:[authGuard]},
    {path:'customer', component:Customer, canActivate:[authGuard]},
    {path:'forgetPassword', component:ForgetPassword},
    {path:'resetPassword', component:ResetPassword},
    {path:'updatePassword', component:UpdatePassword, canActivate: [resetPasswordGuard]},
    {path:'userrole', component:Userrole},
];
