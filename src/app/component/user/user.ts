import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuPermission, UserModel } from '../../_model/user.model';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdate } from '../user-update/user-update';

@Component({
    selector: 'app-user',
    imports: [MaterialModule, ReactiveFormsModule, MatTableModule],
    templateUrl: './user.html',
    styleUrl: './user.css',
})
export class User implements OnInit{
    _userList !: UserModel[]
    _displayColumns: string[]=["username", "name", "email", "phone", "status", "role", "action"];
    _dataSource: any;
    _permission: MenuPermission={
        userRole: '',
        code: '',
        menuCode: '',
        name: '',
        haveView: false,
        haveAdd: false,
        haveEdit: false,
        haveDelete: false
    };
    _response: any;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;

    constructor(
        private userService: UserService,
        private toastr: ToastrService,
        private route: Router,
        private dialog: MatDialog
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
            this._dataSource.paginator = this.paginator;
            this._dataSource.sort = this.sort;
        });
    }

    updateRole(username: string){
        this.openPopup(username, 'role');
    }

    updateStatus(username: string){
        this.openPopup(username, 'status');

    }

    openPopup(username: string, type: string){
        this.dialog.open(UserUpdate, {
            width:'30%',
            enterAnimationDuration: '1000ms',
            exitAnimationDuration: '1000ms',
            data: {
                username: username,
                type: type
            }
        }).afterClosed().subscribe(item => {
            this.loadUser();
        });
    }
}
