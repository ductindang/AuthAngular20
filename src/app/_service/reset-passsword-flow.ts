import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ResetPassswordFlow {
    private canAccessReset = false;

    allowResetPassword() {
        this.canAccessReset = true;
    }

    canAccess() {
        return this.canAccessReset;
    }

    resetAccess() {
        this.canAccessReset = false;
    }
}
