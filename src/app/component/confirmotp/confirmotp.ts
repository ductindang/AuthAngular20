import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { RegisterConfirm } from '../../_model/user.model';

@Component({
    selector: 'app-confirmotp',
    standalone: true,
    imports: [FormsModule, MaterialModule, RouterLink],
    templateUrl: './confirmotp.html',
    styleUrls: ['./confirmotp.css'],
})
export class ConfirmOtp implements OnInit{
    _otp: string[] = ['', '', '', '', '', ''];
    _regResponse!: RegisterConfirm;
    _response: any;

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this._regResponse = this.userService._registerResponse();
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

    confirmOTP() {
        // Connect all the element of the _otp list
        const fullOtp = this._otp.join('');
        if(fullOtp.length === 6){
            this._regResponse.otpText = fullOtp;
            this.userService.ConfirmRegistration(this._regResponse).subscribe(item =>{
                this._response = item;
                if(this._response.result == 'Pass'){
                    // Inform for register successful
                    this.toastr.success(`Registeration completed successfully`, `Confirm success`);
                    console.log(`Full OTP: `, fullOtp);
                    this.userService._registerResponse.set({
                        userId: 0,
                        username: '',
                        otpText: '',
                    });

                    this.router.navigateByUrl('/login');
                }else{
                    this.toastr.error('Failed due to: ' + this._response.message, 'Registration failed');
                }
            });
            
        }else{
            this.toastr.error('Please press enough 6 OTP number');
        }

    }
}
