import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AuthService} from "../../pages/auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthenticated.pipe(
      map(status => !status),
      tap(status => {
        if (!status) {
          console.log('Unathenticated');
          this.router.navigateByUrl('admin/home');
        }
      })
    );
  }
}
