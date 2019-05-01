import {Component, Input, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavParams, PopoverController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-change-password-popover',
    templateUrl: './change-password-popover.component.html',
    styleUrls: ['./change-password-popover.component.scss']
})
export class ChangePasswordPopoverComponent implements OnInit {
    newPassword: any;
    reenteredPassword: any;
    oldPassword: any;

    constructor(private storage: Storage, private navParams: NavParams,
                private popoverController: PopoverController, private toastController: ToastController) {
    }

    ngOnInit() {
    }

    changePassword() {
        this.storage.get('login').then((val) => {
            if (val != null) {
                if (this.validateDetails()) {
                    let data = {
                        firstName: val.firstName,
                        lastName: val.lastName,
                        username: val.username,
                        password: this.newPassword,
                        question: val.question
                    };
                    this.storage.set('login', data).then((res) => {
                        if (res != null) {
                            this.closePopover();
                        }
                    });
                }
            }
        });
    }

    async closePopover() {
        await this.popoverController.dismiss();
        this.presentToastSuccess('Password Updated');
    }

    validateDetails() {
        if (this.oldPassword == undefined || this.newPassword == undefined || this.reenteredPassword == undefined) {
            this.presentToastError('Please Fill in Everything.');
            return false;
        }
        if (this.newPassword != this.reenteredPassword) {
            this.presentToastError('Password Do Not Match.');
            return false;
        } else if (this.newPassword.split('').length < 3) {
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
