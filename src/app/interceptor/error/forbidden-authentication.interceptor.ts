import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, of} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const forbiddenAuthenticationInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status === 403) {
      const router = inject(Router);
      router.navigate(['/login']);
    }
    return of(error.error)
  }));
};
