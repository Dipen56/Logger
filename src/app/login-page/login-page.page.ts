import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.page.html',
    styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
    username: string;
    password: any;

    constructor(private storage: Storage, private router: Router,
                private toastController: ToastController) {
    }

    ngOnInit() {
        // this.storage.clear();
    }

    login() {
        this.storage.get('login').then(res => {
            if (res != null) {
                if(res.username.toUpperCase() == this.username.toUpperCase()){
                    if (res.password == this.password){
                        this.router.navigate(['dashboard-page']);
                    }
                } else {
                    this.presentToastError("");
                }
            }
        });
    }
    async presentToastError(msg) {
        const toast = await this.toastController.create({
            message: 'Error: ' + msg,
            duration: 1500
        });
        toast.color = 'danger';
        toast.present();
    }
}
