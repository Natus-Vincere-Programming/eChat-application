import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {JwtService} from "../services/jwt/jwt.service";

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  let token = inject(JwtService).getAccessToken();
  if (token === null) next(req);
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token,
    },
  });
  return next(clonedRequest);
};
