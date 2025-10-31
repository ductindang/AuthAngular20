import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse, UserCred } from '../../_model/user.model';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, MaterialModule, RouterLink],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login implements OnInit{
    _loginForm: any;
    _response: LoginResponse;
    constructor(
        private builder: FormBuilder, 
        private userService: UserService, 
        private toastr:ToastrService,
        private router:Router
    ){}

    ngOnInit(): void {
        this._loginForm = this.builder.group({
            username:this.builder.control('', Validators.required),
            password:this.builder.control('', Validators.required),
        });
    }

    proceedLogin(){
        if(this._loginForm.valid){
            let obj:UserCred = {
                username: this._loginForm.value.username as string,
                password: this._loginForm.value.password as string
            }

            this.userService.LoginProceed(obj).subscribe(item => {
                this._response = item;
                localStorage.setItem('token', this._response.token);
                localStorage.setItem('username', obj.username);
                localStorage.setItem('userRole', this._response.userRole);
                this.router.navigateByUrl('/');
            }, error => {
                this.toastr.error('Failed to login', error.error.title);
            });
        }
    }

    

}
