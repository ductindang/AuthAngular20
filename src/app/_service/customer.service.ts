import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CustomerModel } from '../_model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
    constructor(private http:HttpClient){}

    baseUrl = environment.apiUrl;

    GetAll(){
        return this.http.get<CustomerModel[]>(this.baseUrl + 'Customer')
    }

    GetByCode(code:string){
        return this.http.get<CustomerModel>(this.baseUrl + 'Customer/GetByCode?code=' + code)
    }

    CreateCustomer(customer:CustomerModel){
        return this.http.post(this.baseUrl + 'Customer', customer)
    }
    
    UpdateCustomer(customer:CustomerModel){
        return this.http.put(this.baseUrl + 'Customer?code=' + customer.code, customer)
    }

    DeleteCustomer(code:string){
        return this.http.delete(this.baseUrl + 'Customer?code=' + code)
    }

}
