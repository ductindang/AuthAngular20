import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../_service/customer.service';
import { CustomerModel } from '../../_model/customer.model';

@Component({
    selector: 'app-add-customer',
    imports: [MaterialModule, ReactiveFormsModule, RouterLink],
    templateUrl: './add-customer.html',
    styleUrl: './add-customer.css',
})
export class AddCustomer implements OnInit {
    _customerForm: any;
    _response: any;
    _title = 'Add customer';

    constructor(
        private builder:FormBuilder,
        private toastr:ToastrService,
        private route:Router,
        private cusService:CustomerService
    ){}

    ngOnInit(): void {
        this._customerForm = this.builder.group({
            code: this.builder.control('', Validators.required),
            name: this.builder.control('', Validators.required),
            email: this.builder.control('', Validators.required),
            phone: this.builder.control('', Validators.required),
            creditLimit: this.builder.control(0, Validators.required),
            status: this.builder.control(true),
        });
    }

    saveCustomer(){
        if(this._customerForm.valid){
            let _obj:CustomerModel={
                code: this._customerForm.value.code as string,
                name: this._customerForm.value.name as string,
                email: this._customerForm.value.email as string,
                phone: this._customerForm.value.phone as string,
                creditLimit: this._customerForm.value.creditLimit as number,
                isActive: this._customerForm.value.status as boolean,
                statusName: ''
            }
            this.cusService.CreateCustomer(_obj).subscribe(item => {
                this._response = item;
                if(this._response.result === 'Pass'){
                    this.toastr.success('Created successfully', 'Success');
                    this.route.navigateByUrl('/customer')
                }else{
                    this.toastr.error('Due to: ' + this._response.message, 'Failed');
                }
            })
        }

        
    }

    

} 
