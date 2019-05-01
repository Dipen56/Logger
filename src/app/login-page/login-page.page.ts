import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {MenuController} from '@ionic/angular';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.page.html',
    styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
    username: string;
    password: any;

    constructor(private storage: Storage, private router: Router,
                private toastController: ToastController, private  menuController: MenuController,
                private alertController: AlertController) {
    }

    ngOnInit() {
        // this.storage.clear();
    }

    ionViewWillEnter() {
        this.menuController.enable(false);
    }

    login() {
        this.storage.get('login').then(res => {
            if (res != null) {
                if (res.username.toUpperCase() == this.username.toUpperCase()) {
                    if (res.password == this.password) {

                        this.router.navigate(['dashboard-page']);
                    } else {
                        this.presentToastError('Username or Password Incorrect');
                    }
                } else {
                    this.presentToastError('Username or Password Incorrect');
                }
            }
        });
    }

    async forgotPasswordAlert() {
        const alert = await this.alertController.create({
            header: 'Help Me :(',
            message: 'Answer security question.',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'What is my favourite color?'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        this.alertController.dismiss();
                    }
                }, {
                    text: 'Okay',
                    handler: data => {
                        this.storage.get('login').then(res => {
                            if (res != null) {
                                if (res.question == data.name) {
                                    this.alertController.dismiss();
                                    this.showPasswordAlert(res.username, res.password);
                                } else {
                                    this.presentToastError('Incorrect Answer...');
                                }
                            }
                        });
                    }
                }
            ],
        });

        await alert.present();
    }

    async showPasswordAlert(username, password) {
        const alert = await this.alertController.create({
            header: 'Help Has Arrived :)',
            message: 'Your Username is: ' + username + ' \<br> \Your password is:' + password,

            buttons: [
                {
                    text: 'Okay',
                    handler: data => {
                        this.alertController.dismiss();
                    }
                }
            ],
        });

        await alert.present();
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
