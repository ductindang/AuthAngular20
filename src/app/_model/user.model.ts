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