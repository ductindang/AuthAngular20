import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../_service/user.service';
import { UpdateUser, UserModel } from '../../_model/user.model';
import { Role } from '../../_model/role.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-update',
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './user-update.html',
    styleUrl: './user-update.css',
})
export class UserUpdate implements OnInit{
    _dialogData: any;
    _userData!: UserModel;
    _userForm: any;
    _roleList: Role[];
    _type = '';
    _response: any;

    constructor(
        private builder: FormBuilder, 
        private toastr: ToastrService,
        private userService: UserService,
        private route: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private ref: MatDialogRef<UserUpdate>
    ){}

    ngOnInit(): void {
        this.loadRoles();
        this._dialogData = this.data;
        this._type = this._dialogData.type;
        this._userForm = this.builder.group({
            username: this.builder.control({value:'', disabled:true}),
            role: this.builder.control('', Validators.required),
            status: this.builder.control(true)
        })

        if(this._dialogData.username !== ''){
            this.userService.GetUserByCode(this._dialogData.username).subscribe(item => {
                this._userData = item;
                this._userForm.setValue({
                    username: this._userData.username,
                    role: this._userData.role,
                    status: this._userData.isActive
                })
            });
        }
    }

    loadRoles(){
        this.userService.GetAllRoles().subscribe(item => {
            this._roleList = item;
        });
    }

    
    proceedChange(){
        let obj: UpdateUser={
            username: this._dialogData.username,
            role: this._userForm.value.role as string,
            status: this._userForm.value.status as boolean
        };
        if(this._userForm.valid){
            if(this._type === 'role'){
                this.userService.UpdateRole(obj).subscribe(item =>{
                    this._response = item;
                    if(this._response.result === 'Pass'){
                        this.toastr.success('Updated successfully', 'Role update')
                        this.closePopup();
                    }else{
                        this.toastr.error('Failed due to: ' + this._response.message,'Role update')
                    }
                });
            }else{
                this.userService.UpdateStatus(obj).subscribe(item =>{
                    this._response = item;
                    if(this._response.result === 'Pass'){
                        this.toastr.success('Updated successfully', 'Status update')
                        this.closePopup();
                    }else{
                        this.toastr.error('Failed due to: ' + this._response.message,'Status update')
                    }
                });
            }
        }
    }

    closePopup(){
        this.ref.close();
    }

}
