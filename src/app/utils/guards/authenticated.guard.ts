import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from "../../pages/auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthenticated.pipe(
      tap(status => {
        if (!status) {
          this.router.navigateByUrl('login');
        }
      })
    );
  }
}
