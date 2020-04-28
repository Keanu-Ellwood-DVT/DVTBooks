import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.auth.userProfileData !== null) {
      if (!!this.auth.userProfileData[environment.NAMESPACE] && this.auth.userProfileData[environment.NAMESPACE].includes('Admin')) {
        this.auth.isAdmin = true;
        return true;
      }
    }
    this.router.navigate(['/forbidden']);
    return false;
  }
}
