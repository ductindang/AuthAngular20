import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// Dang ky dinh tuyen cua ung dung
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideToastr } from 'ngx-toastr';
import { tokenInterceptor } from './_service/token-interceptor';

// Dependency injection
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // Theo doi loi khong duoc xu ly
    provideZoneChangeDetection({ eventCoalescing: true }),// Co che phat hien thay doi
    provideRouter(routes),
    // them token vao http
    provideHttpClient(withInterceptors([tokenInterceptor])),// Kich hoat va cung cap cac dich vu de goi duoc API
    provideToastr({closeButton: true})// Thu vien ben thu 3 => Cau hinh va dang ky dich vu thong bao: tham so button la de co nut dong tren moi thong bao
  ]
};