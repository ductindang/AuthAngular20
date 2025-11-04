import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { UpdatePasswordModel } from '../../_model/user.model';

@Component({
  selector: 'app-update-password',
  imports: [MaterialModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './update-password.html',
  styleUrl: './update-password.css',
})
export class UpdatePassword implements OnInit{
    _otp: string[] = ['', '', '', '', '', ''];
    _currentUsername = '';
    _response: any;
    _resetForm: any;

    constructor(private builder: FormBuilder, 
        private userService: UserService, 
        private toastr:ToastrService,
        private router:Router
    ){}

    // phai khai bao ngOnInit, neu khong co thi no se chay truoc constructor
    ngOnInit(): void {
        this._currentUsername = this.userService._username();
        this._resetForm = this.builder.group({
            password: this.builder.control('', Validators.required)
        });

    }

    onKeyUp(event: KeyboardEvent, index: number){
        const inputElement = event.target as HTMLInputElement;
        const key = event.key;

        // Just allow press numbers
        if(isNaN(Number(inputElement.value))){
            inputElement.value = '';
            this._otp[index] = '';
            return;
        }

        // Auto change to the next blank if press enough 1 character
        if(inputElement.value.length === 1 && index < 5){
            const nextInput = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement;
            nextInput?.focus();
        }

        // When press backspace and current box is empty -> back to the previous box
        if(key === 'Backspace' && inputElement.value.length === 0 && index > 0){
            const prevInput = document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement;
            prevInput?.focus();
        }
    }


    proceedChangedPass() {
        const fullOtp = this._otp.join('');
        // Gan gia tri cho obj
        if (this._resetForm.valid) {
            let obj: UpdatePasswordModel = {
                username: this._currentUsername,
                password: this._resetForm.value.password as string,
                otpText: fullOtp
            };
            // Goi ham UserRegistration trong userService de lay host api
            this.userService.UpdatePasswordProceed(obj).subscribe(item => {
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
