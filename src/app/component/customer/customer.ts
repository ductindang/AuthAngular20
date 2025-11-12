import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../_service/customer.service';
import { CustomerModel } from '../../_model/customer.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MenuPermission } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-customer',
    imports: [MaterialModule, RouterLink, MatTableModule, CommonModule, MatPaginator],
    templateUrl: './customer.html',
    styleUrl: './customer.css',
})
export class Customer implements OnInit{
    _customerList !: CustomerModel[]
    _displayColumns: string[]=["code", "name", "email", "phone", "creditLimit", "status", "action"];
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

    // Khai bao paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    // Add sort for each column
    @ViewChild(MatSort) sort !: MatSort;

    constructor(
        private cusService: CustomerService, 
        private userService: UserService,
        private toastr: ToastrService,
        private router: Router,
        
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

    // Load customer list to the UI
    loadCustomer(){
        this.cusService.GetAll().subscribe(item => {
            this._customerList = item;
            this._dataSource = new MatTableDataSource<CustomerModel>(this._customerList);
            // Add pagination and sort to the page
            this._dataSource.paginator = this.paginator;
            this._dataSource.sort = this.sort;
        })
    }

    functionEdit(code: string){
        if(this._permission.haveEdit){
            this.router.navigateByUrl('/customer/edit/' + code);
        }else{
            this.toastr.warning('User not having edit access');
        }
    }

    _showConfirm = false;
    _selectedCode = '';

    functionDelete(code:string){
        if(this._permission.haveDelete){
            this._selectedCode = code;
            this._showConfirm = true;
        }else{
            this.toastr.warning('User not having delete access', 'Warning');
        }
    }

    confirmDelete(){
        this._showConfirm = false;
        this.cusService.DeleteCustomer(this._selectedCode).subscribe(item => {
            this._response = item;
            if(this._response.result === 'Pass'){
                this.toastr.success('Delete completed', 'Success');
                this.loadCustomer();
            }else{
                this.toastr.error('Due to: ' + this._response.message, 'Failed');
            }
        });
    }

    cancelDelete(){
        this._showConfirm = false;
    }

    // functionDelete(code: string){
    //     if(this._permission.haveDelete){
    //         if(confirm('Are you sure? ')){
    //             this.cusService.DeleteCustomer(code).subscribe(item => {
    //                 this._response = item;
    //                 if(this._response.result === 'Pass'){
    //                     this.toastr.success('Delete completed', 'Success')
    //                     this.loadCustomer();
    //                 }else{
    //                     this.toastr.error('Due to: ' + this._response.message, 'Failed')
    //                 }
    //             })
    //         }
    //     }else{
    //         this.toastr.warning('User not having edit access');
    //     }       
    // }

}
