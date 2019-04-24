import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class SignupGuard implements CanActivate {
    login: any;
    constructor(private router: Router, private storage: Storage) {

    }

  canActivate(route: ActivatedRouteSnapshot): boolean {
       this.storage.get('login').then((res) => {
            this.login = res;
            if (this.login != null) {
                this.router.navigate(['login-page']);
                return false;
            } else {
                return true;
            }
        });
        this.router.navigate(['login-page']);
        return false;
    }
}
