import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginResponse, Menu, RegisterConfirm, UserCred, UserRegister } from '../_model/user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // dung HttpClient de call api
    constructor(private http:HttpClient){}

    // Use the environment folder that I created by myself
    baseUrl = environment.apiUrl;

    _registerResponse = signal<RegisterConfirm>({
         userId: 0,
         username: '',
         otpText: ''
    })

    UserRegistration(data: UserRegister){
        return this.http.post(this.baseUrl + 'User/userRegistration', data);
    }

    ConfirmRegistration(data: RegisterConfirm){
        return this.http.post(this.baseUrl + 'User/confirmRegistration', data);
    }

    LoginProceed(data: UserCred){
        return this.http.post<LoginResponse>(this.baseUrl + 'Authorize/GenerateToken', data);
    }

    GetMenuByRole(role: string){
        return this.http.get<Menu[]>(this.baseUrl + 'UserRole/getAllMenusByRole?userRole=' + role);
    }

    
}
