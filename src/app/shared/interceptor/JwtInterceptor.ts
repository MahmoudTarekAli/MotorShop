import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from "../../authentication/services/auth.service";

@Injectable()
  export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const ignore =
      typeof request.body === 'undefined'
      || request.body === null
      || request.body.toString() === '[object FormData]' // <-- This solves your problem
      || request.headers.has('Content-Type');
    if (ignore) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.authService.getToken()}`
        }
      });
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `${this.authService.getToken()}`
      }
    });

    return next.handle(request).pipe(
      //   catchError(x => this.handleAuthError(x))
      // tslint:disable-next-line:max-line-length
    ); // here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
  }
}
