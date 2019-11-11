import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './request-intercepetor';

export const HttpInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }];
