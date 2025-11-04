// Cach add guard: ng g g _guard/auth

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_service/user.service';

// Kiem tra co duoc phep kich hoat mot route nhat dinh hay khong
export const authGuard: CanActivateFn = (route, state) => {
    // dependency injection
    let router = inject(Router);
    let toastr = inject(ToastrService);
    let userService = inject(UserService);

    let menuCode = '';
    if(route.url.length > 0){
        menuCode = route.url[0].path;
    }

    // Kiem tra dang nhap hay chua
    if(localStorage.getItem('username') != null){
        let userRole = localStorage.getItem('userRole') as string;
        if(menuCode != ''){
            userService.GetMenuPermission(userRole, menuCode).subscribe(item => {
                if(item.haveView){
                    return true;
                }else{
                    toastr.warning('Unauthorized access');
                    router.navigateByUrl('/');
                    return false;
                }
            });
            return true;
        }else{
            return true;
        }
    }else{
        toastr.warning('Unauthorized access');
        router.navigateByUrl('/');
        return false;
    }

};
