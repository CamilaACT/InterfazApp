import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  console.log("intenceptor lo tiene")
  return next(req);
};
