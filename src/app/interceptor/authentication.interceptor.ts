import {HttpInterceptorFn} from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('access_token');
  if (token === null) next(req);
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token,
    },
  });
  return next(clonedRequest);
};
