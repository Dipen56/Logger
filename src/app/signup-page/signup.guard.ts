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

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean
        | UrlTree>
        | Promise<boolean
        | UrlTree>
        | boolean
        | UrlTree {
        return this.storage.get('login').then((res) => {
            this.login = res;
            if (res != null) {
                this.router.navigate(['login-page']);
                return false;
            } else {
                return true;
            }
        });
    }

}

