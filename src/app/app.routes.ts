import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Login } from './component/login/login';
import { ConfirmOtp } from './component/confirmotp/confirmotp';
import { Register } from './component/register/register';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'register', component:Register},
    {path:'login', component:Login},
    {path:'confirmotp', component:ConfirmOtp}
];
