import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {MenuController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signup-page',
    templateUrl: './signup-page.page.html',
    styleUrls: ['./signup-page.page.scss'],
})
export class SignupPagePage implements OnInit {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    re_entered_password: string;
    question: string;

    constructor(private storage: Storage, private toastController: ToastController,
                private router: Router, private  menuController: MenuController) {
    }

    ngOnInit() {
        this.storage.get('login').then(val => {
            if (val != null) {
                this.router.navigate(['login-page']);
            }
        });
    }

    ionViewWillEnter() {
        this.menuController.enable(false);
    }

    signupUser() {
        let isDetailValid = this.validateDetails();
        if (isDetailValid) {
            let data = {
                firstName: this.firstName.trim(),
                lastName: this.lastName.trim(),
                username: this.username.trim(),
                password: this.password.trim(),
                question: this.question.trim()
            };
            this.storage.set('login', data).then((val) => {
                this.presentToastSuccess('Details Saved.').then(res => {
                    this.router.navigate(['login-page']);
                });
            });
        }

    }

    validateDetails() {
        if (this.firstName.trim() == undefined || this.lastName.trim() == undefined || this.username.trim() == undefined || this.question.trim() == undefined
            || this.password.trim() == undefined || this.re_entered_password.trim() == undefined) {
            this.presentToastError('Please Fill in Everything.');
            return false;
        }
        if (this.password.trim() != this.re_entered_password.trim()) {
            this.presentToastError('Password Do Not Match.');
            return false;
        } else if (this.password.trim() == undefined || this.re_entered_password.trim() == undefined) {
            this.presentToastError('Password Cannot Be Empty.');
            return false;
        } else if (this.password.trim().split('').length < 3) {
            this.presentToastError('Password Must Be Larger Then 4 Characters.');
            return false;
        } else {
            return true;
        }
    }

    async presentToastError(msg) {
        const toast = await this.toastController.create({
            message: 'Error: ' + msg,
            duration: 1500
        });
        toast.color = 'danger';
        toast.present();
    }

    async presentToastSuccess(msg) {
        const toast = await this.toastController.create({
            message: 'Success: ' + msg,
            duration: 1500
        });
        toast.color = 'success';
        toast.present();
    }
}
