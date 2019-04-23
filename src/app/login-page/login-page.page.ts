import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.page.html',
    styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
    username: string;
    password: any;

    constructor(private storage: Storage, private router: Router) {
    }

    ngOnInit() {
    }

    login() {
        this.storage.get('login').then(res => {
            if (res != null) {
                if(res.username.toUpperCase() == this.username.toUpperCase()){
                    if (res.password == this.password){
                        this.router.navigate(['dashboard-page']);
                    }
                }
            }
        });
    }
}
