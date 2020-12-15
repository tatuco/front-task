import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService,
              private router: Router,
              private toast: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.hasToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.auth.token}`
        }
      });
    }
    return next.handle(request).pipe(
      tap(
        (data: any) => {
          if (data.status === 404) {
            this.toast.error('Error del servidor.');
          }
          if (data.error) {
            this.toast.error(data.mensaje);
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.auth.logout();
            this.router.navigateByUrl('/login').then(() => {
              this.toast.error('Se ha vencido su sesión.');
            });
          }
        })
    );
  }
}

export const AuthinterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
