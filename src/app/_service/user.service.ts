import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginResponse, Menu, MenuPermission, RegisterConfirm, ResetPasswordModel, UpdatePasswordModel, UserCred, UserRegister } from '../_model/user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // dung HttpClient de call api
    constructor(private http:HttpClient){}

    // Use the environment folder that I created by myself
    baseUrl = environment.apiUrl;

    // Tao mot registrResponse de luu thong tin tra ve, sau do truyen du lieu vao cac trang khac
    _registerResponse = signal<RegisterConfirm>({
         userId: 0,
         username: '',
         otpText: ''
    })

    _menuList = signal<Menu[]>([]);

    _username = signal('');

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

    ResetPasswordProceed(data: ResetPasswordModel){
        return this.http.put<ResetPasswordModel>(this.baseUrl + 'User/resetPassword', data);
    }

    ForgetPasswordProceed(username: string){
        return this.http.get(this.baseUrl + 'User/forgetPassword?username=' + username);
    }

    UpdatePasswordProceed(data: UpdatePasswordModel){
        return this.http.put(this.baseUrl + 'User/updatePassword', data);
    }

    GetMenuPermission(role: string, menuCode: string){
        return this.http.get<MenuPermission>(this.baseUrl + 'UserRole/getMenuPermissionByRole?userRole=' + role +'&menuCode=' + menuCode)
    }
}
