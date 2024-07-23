import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {JwtService} from "../services/jwt/jwt.service";

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  const accessToken = jwtService.getAccessToken();
  if (accessToken === '') next(req);
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + accessToken,
    },
  });
  return next(clonedRequest);
};
