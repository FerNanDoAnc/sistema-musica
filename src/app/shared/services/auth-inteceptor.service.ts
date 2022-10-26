import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInteceptorService implements HttpInterceptor{

  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    // console.log("http intercept",token);

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
    return next.handle(request)
    // return next.handle(request).pipe(
    //   catchError((err: HttpErrorResponse) => {

    //     if (err.status === 401) {
    //       this.router.navigateByUrl('/auth/login');
    //     }

    //     return throwError( err );

    //   })
    // );
  }
}
