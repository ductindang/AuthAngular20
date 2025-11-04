import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { ResetPassswordFlow } from '../_service/reset-passsword-flow';

@Injectable({
  providedIn: 'root'
})

export class resetPasswordGuard implements CanActivate{
    constructor(
        private router: Router,
        private passwordService: ResetPassswordFlow
    ){}

    canActivate():  boolean{
        // Goi ham nay de co the access
        if(this.passwordService.canAccess()){
            // sau do tra access ve false de khong cho truy cap
            this.passwordService.resetAccess();
            return true;
        }
        
        // Neu khong co quyen -> quay lai login
        this.router.navigate(['/login']);
        return false;
    }
};
