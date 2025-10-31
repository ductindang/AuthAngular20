import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { RegisterConfirm, UserRegister } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    standalone: true,
    // Import de su dung trong file '.ts' va '.html'
    imports: [ReactiveFormsModule, MaterialModule, RouterLink],
    templateUrl: './register.html',
    styleUrls: ['./register.css'],
})
export class Register implements OnInit {
    _response: any;
    _regForm: any;

    // Su dung dependency injection
    constructor(private builder: FormBuilder, 
        private userService: UserService, 
        private toastr:ToastrService,
        private router:Router
    ) {}

    // phai khai bao ngOnInit, neu khong co thi no se chay truoc constructor
    ngOnInit(): void {
        this._regForm = this.builder.group({
            username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
            password: this.builder.control('', Validators.required),
            confirmPassword: this.builder.control('', Validators.required),
            name: this.builder.control('', Validators.required),
            email: this.builder.control('', Validators.required),
            phone: this.builder.control('', Validators.required)
        });

    }

    proceedRegister() {
        // Gan gia tri cho obj
        if (this._regForm.valid) {
            let obj: UserRegister = {
                username: this._regForm.value.username as string,
                name: this._regForm.value.name as string,
                phone: this._regForm.value.phone as string,
                email: this._regForm.value.email as string,
                password: this._regForm.value.password as string,
            };
            // Goi ham UserRegistration trong userService de lay host api
            this.userService.UserRegistration(obj).subscribe(item => {
                // item la du lieu do api tra ve, obj la tham so truyen vao
                this._response = item;
                console.log(this._response)
                if(this._response.result = 'Pass'){
                    // Lay thong tin de truyen sang cho trang confirmOtp
                    let confirmObj:RegisterConfirm = {
                        userId: this._response.message,
                        username: obj.username,
                        otpText: ''
                    }
                    // set du lieu vao _registerResponse trong userService
                    this.userService._registerResponse.set(confirmObj);

                    this.toastr.success('Validate OTP & complete the registration', 'Registration')
                    // truyen du lieu qua file confirmotp
                    this.router.navigateByUrl('/confirmotp')
                }else{
                    this.toastr.error('Failed due to: ' + this._response.message,'Registration failed')
                }
            });
        }
        console.log(this._response)
    }
}
