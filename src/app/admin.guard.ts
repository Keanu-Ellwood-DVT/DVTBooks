import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    // let isAdmin : boolean = this.auth._checkAdmin(this.auth.userProfile$);
    if (this.auth.isAdmin) {
      return true;
    }
    this.router.navigate(['/forbidden']);
    return false;
  }

}
