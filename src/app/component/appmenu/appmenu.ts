import { Component, OnInit } from '@angular/core';
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
export class AppMenu implements OnInit{
    _menuList!: Menu[];
    constructor(private userService:UserService, private router:Router){}
    

    ngOnInit(): void {
        let userRole = localStorage.getItem('userRole');
        this.userService.GetMenuByRole(userRole).subscribe(item => {
            this._menuList = item;
        });
    }


}
