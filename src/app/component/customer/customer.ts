import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../_service/customer.service';
import { CustomerModel } from '../../_model/customer.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MenuPermission } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-customer',
    imports: [MaterialModule, RouterLink, MatTableModule, CommonModule],
    templateUrl: './customer.html',
    styleUrl: './customer.css',
})
export class Customer implements OnInit{
    _customerList !: CustomerModel[]
    _displayColumns: string[]=["code", "name", "email", "phone", "creditLimit", "status", "action"];
    _dataSource: any;
    _permission: MenuPermission;

    constructor(
        private cusService: CustomerService, 
        private userService:UserService,
        private toastr:ToastrService
    ){
        this.setAccess();
    }

    ngOnInit(): void {
        this.loadCustomer();
    }

    setAccess(){
        let role = localStorage.getItem('userRole') as string;
        this.userService.GetMenuPermission(role, 'customer').subscribe(item =>{
            this._permission = item;
        });
    }

    loadCustomer(){
        this.cusService.GetAll().subscribe(item => {
            this._customerList = item;
            this._dataSource = new MatTableDataSource<CustomerModel>(this._customerList);
        })
    }

    functionEdit(code: string){
        if(this._permission.haveEdit){

        }else{
            this.toastr.warning('User not having edit access');
        }
    }

    functionDelete(code: string){
        if(this._permission.haveDelete){
            
        }else{
            this.toastr.warning('User not having edit access');
        }       
    }
}
