import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { MenuRole, Role } from '../../_model/role.model';
import { CommonModule } from '@angular/common';
import { MenuPermission } from '../../_model/user.model';

@Component({
    selector: 'app-user-role',
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    templateUrl: './user-role.html',
    styleUrl: './user-role.css',
})
export class UserRole implements OnInit{

    _roleList!: Role[];
    _menuList!: MenuRole[];
    _roleForm: any;
    _accessArray!: FormArray<any>;
    _userAccess !: MenuPermission;
    _response: any;

    constructor(
        private builder:FormBuilder,
        private toastr:ToastrService,
        private userService: UserService
    ){
        
    }

    ngOnInit(): void {
        this.loadRoles();
        this._roleForm = this.builder.group({
            userRole: this.builder.control('', Validators.required),
            access: this.builder.array([])
        });
        this.loadMenus('');
    }

    // Gen all row on the UI
    generateMenuRow(input: MenuRole, access: MenuPermission, role: string){
        return this.builder.group({
            name: this.builder.control(input.name),
            menuCode: this.builder.control(input.code),
            haveView: this.builder.control(access.haveView),
            haveAdd: this.builder.control(access.haveAdd),
            haveEdit: this.builder.control(access.haveEdit),
            haveDelete: this.builder.control(access.haveDelete),
            userRole: this.builder.control(role),
        });
    }

    addNewRole(input: MenuRole, access: MenuPermission, role: string){
        // push gen menu to the UI, do not code in UI
        this._accessArray.push(this.generateMenuRow(input, access, role));
    }

    get getRows(){
        return this._roleForm.get('access') as FormArray;
    }

    // Read all roles and display in UI
    loadRoles(){
        this.userService.GetAllRoles().subscribe(item => {
            this._roleList = item;
        });
    }

    loadMenus(userRole:string){
        this._accessArray = this._roleForm.get('access') as FormArray;
        this._accessArray.clear();
        this.userService.GetAllMenus().subscribe(item => {
            this._menuList = item;
            if(this._menuList.length > 0){
                this._menuList.map((o: MenuRole) => {
                    if(userRole != ''){
                        this.userService.GetMenuPermission(userRole, o.code).subscribe(item => {
                            this._userAccess = item;
                            this.addNewRole(o, this._userAccess, userRole);
                        });
                    }else{
                        this.addNewRole(o, {
                            userRole: '',
                            code: '',
                            name: '',
                            menuCode: '',
                            haveView: false,
                            haveAdd: false,
                            haveEdit: false,
                            haveDelete: false
                        }, '');
                    }
                    
                });
            }
        });
    }

    roleChange(event:any){
        let selectedRole = event.value;
        this.loadMenus(selectedRole);
    }
    

    saveRoles(){
        if(this._roleForm.valid){
            let formArray = this._roleForm.value.access as MenuPermission[];
            this.userService.AssignRolePermission(formArray).subscribe(item =>{
                this._response = item;
                if(this._response.result === 'Pass'){
                    this.toastr.success('Permission assigned completed', 'Saved');
                }else{
                    this.toastr.error('Due to: ' + this._response.message, 'Menu access assignment');
                }
            });
        }
    }

}
