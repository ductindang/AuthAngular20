export interface UserRegister{
    username: string;
    name: string;
    phone: string;
    email: string;
    password: string;
}

export class RegisterConfirm{
    userId: 0;
    username: string;
    otpText: string;
}

export class UserCred{
    username: string;
    password: string;
}

export class LoginResponse{
    token: string;
    refreshToken: string;
    userRole: string;
}

export interface Menu{
    code: string;
    name: string;
}

export class ResetPasswordModel{
    username: string;
    oldPassword: string;
    newPassword: string;
}

export class UpdatePasswordModel{
    username: string;
    password: string;
    otpText: string;
}

export class MenuPermission{
    code: string;
    name: string;
    haveView: boolean;
    haveAdd: boolean;
    haveEdit: boolean;
    haveDelete: boolean;
}

export interface UserModel{
    userName: string;
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    statusName: string;
    role: string;
}