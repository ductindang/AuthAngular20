import { Component, DoCheck, effect, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../_service/user.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Menu } from '../../_model/user.model';

@Component({
    selector: 'app-appmenu',
    imports: [MaterialModule, RouterOutlet, RouterLink],
    templateUrl: './appmenu.html',
    styleUrl: './appmenu.css',
})
export class AppMenu implements OnInit, DoCheck{
    _menuList!: Menu[];
    _loginUser = '';
    _showMenu = false;

    constructor(private userService:UserService, private router:Router){
        // Cap nhat menulist lien tuc
        effect(() => {
            this._menuList = this.userService._menuList();
        });
    }


    ngOnInit(): void {
        // Lay ra danh sach cac chuc nang duoc truy cap
        let userRole = localStorage.getItem('userRole');
        this.userService.GetMenuByRole(userRole).subscribe(item => {
            this._menuList = item;
        });
    }


    // Luon thay doi khi thay doi trang
     ngDoCheck(): void {
        // lay username de dua vao view hien thi
        this._loginUser = localStorage.getItem('username') as string;
        this.SetAccess();
    }
    
    SetAccess(){
        let userRole = localStorage.getItem('userRole');
        let currentUrl = this.router.url;
        if(currentUrl == '/register' || currentUrl == '/login' || currentUrl == '/resetPassword' || currentUrl == '/forgetPassword'){
            this._showMenu = false;
        }else{
            this._showMenu = true;
        }
    }

}
