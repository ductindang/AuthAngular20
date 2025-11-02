import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { ResetPasswordModel } from '../../_model/user.model';
import { MaterialModule } from '../../material.module';

@Component({
    selector: 'app-reset-password',
    imports: [MaterialModule, RouterLink, ReactiveFormsModule],
    templateUrl: './reset-password.html',
    styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
    _response: any;
    _resetForm: any;

    // Su dung dependency injection
    constructor(private builder: FormBuilder, 
        private userService: UserService, 
        private toastr:ToastrService,
        private router:Router
    ) {}

    // phai khai bao ngOnInit, neu khong co thi no se chay truoc constructor
    ngOnInit(): void {
        this._resetForm = this.builder.group({
            oldPassword: this.builder.control('', Validators.required),
            newPassword: this.builder.control('', Validators.required),
        });

    }

    proceedChangedPass() {
        // Gan gia tri cho obj
        if (this._resetForm.valid) {
            let obj: ResetPasswordModel = {
                username: localStorage.getItem('username') as string,
                oldPassword: this._resetForm.value.oldPassword as string,
                newPassword: this._resetForm.value.newPassword as string
            };
            // Goi ham UserRegistration trong userService de lay host api
            this.userService.ResetPasswordProceed(obj).subscribe(item => {
                // item la du lieu do api tra ve, obj la tham so truyen vao
                this._response = item;
                console.log(this._response)
                if(this._response.result === 'Pass'){
                    this.toastr.success('Please login with new password', 'Password changed')
                    // truyen du lieu qua file confirmotp
                    this.router.navigateByUrl('/login')
                }else{
                    this.toastr.error('Failed due to: ' + this._response.message,'Reset password failed')
                }
            });
        }
    }
}
