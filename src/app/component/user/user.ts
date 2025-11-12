import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuPermission, UserModel } from '../../_model/user.model';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';

@Component({
    selector: 'app-user',
    imports: [MaterialModule, ReactiveFormsModule, MatTableModule],
    templateUrl: './user.html',
    styleUrl: './user.css',
})
export class User implements OnInit{
    _userList !: UserModel[]
    _displayColumns: string[]=["userName", "name", "email", "phone", "status", "role", "action"];
    _dataSource: any;
    _permission: MenuPermission={
        code: '',
        name: '',
        haveView: false,
        haveAdd: false,
        haveEdit: false,
        haveDelete: false
    };
    _response: any;

    constructor(
        private userService: UserService,
        private toastr: ToastrService,
        private route: Router
    ){
        // this.setAccess();
    }

    ngOnInit(): void {
        this.loadUser();
    }

    // setAccess(){
    //     let role = localStorage.getItem('userRole') as string;
    //     this.userService.GetMenuPermission(role, 'user').subscribe(item => {
    //         this._permission = item;
    //     })
    // }

    loadUser(){
        this.userService.GetAllUsers().subscribe(item => {
            this._userList = item;
            this._dataSource = new MatTableDataSource<UserModel>(this._userList);

        });
    }
}
