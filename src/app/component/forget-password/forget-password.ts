import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { ResetPassswordFlow } from '../../_service/reset-passsword-flow';

@Component({
    selector: 'app-forget-password',
    imports: [MaterialModule, RouterLink, FormsModule],
    templateUrl: './forget-password.html',
    styleUrl: './forget-password.css',
})
export class ForgetPassword implements OnInit{
    _username: '';
    _response: any;

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private userService: UserService,
        private passService: ResetPassswordFlow
    ) {}

    ngOnInit(): void {

    }

    proceedForgetPass() {
        this.userService.ForgetPasswordProceed(this._username).subscribe(item =>{
            this._response = item;
            if(this._response.result === 'Pass'){
                // Cai dat cho duong dan vao update pass la dung
                this.passService.allowResetPassword();
                // Inform for register successful
                this.toastr.success(`OTP sent to the register email`, `Forget password`);
                this.userService._username.set(this._username);

                this.router.navigateByUrl('/updatePassword');
            }else{
                this.toastr.error('Failed due to: ' + this._response.message, 'Registration failed');
            }
        });

    }
}
