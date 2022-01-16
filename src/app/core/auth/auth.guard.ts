import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { StateServiceService } from './state-service.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private $locationStorage: LocalStorageService,
    private router: Router,
    private stateServiceService: StateServiceService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string) {
    const token = this.$locationStorage.retrieve('authenticationtoken');
    if (token) {
      this.stateServiceService.setIslogin(true);
      return true;
    } else {
      this.stateServiceService.storeUrl(url); // if user don't login then, save path for user want to go
      if (!token) {
        this.router.navigate(['/login']);
      }
    }
    return false;
  }
}
