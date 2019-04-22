import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ToastController} from '@ionic/angular';
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
                private router: Router) {
    }

    ngOnInit() {
    }

    signupUser() {
        let isDetailValid = this.validateDetails();
        if (isDetailValid) {
            let data = {
                firstName: this.firstName,
                lastName: this.lastName,
                username: this.username,
                password: this.password,
                question: this.question
            };
            this.storage.set(this.username, data).then((val) => {
                this.presentToastSuccess('Details Saved.').then(res => {
                    this.router.navigate(['login-page']);
                });
            });
        }

    }

    validateDetails() {
        if (this.firstName == undefined || this.lastName == undefined || this.username == undefined || this.question == undefined ||
            this.password == undefined || this.re_entered_password == undefined) {
            this.presentToastError('Please Fill in Everything.');
            return false;
        }
        if (this.password != this.re_entered_password) {
            this.presentToastError('Password Do Not Match.');
            return false;
        } else if (this.password == undefined || this.re_entered_password == undefined) {
            this.presentToastError('Password Cannot Be Empty.');
            return false;
        } else if (this.password.split(). < 2) {
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
