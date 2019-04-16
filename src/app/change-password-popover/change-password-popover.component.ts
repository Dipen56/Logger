import {Component, Input, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavParams} from '@ionic/angular';

@Component({
    selector: 'app-change-password-popover',
    templateUrl: './change-password-popover.component.html',
    styleUrls: ['./change-password-popover.component.scss']
})
export class ChangePasswordPopoverComponent implements OnInit {
    errorMsg = '';
    newPassword: any;
    reenteredPassword: any;
    oldPassword: any;
    popover: any;

    constructor(private storage: Storage, private navParams: NavParams) {
        this.popover = this.navParams.get('popover');
    }

    ngOnInit() {
    }

    changePassword() {
        console.log(this.oldPassword);
        this.storage.get('password').then((val) => {
            if (this.oldPassword == val) {
                if (this.newPassword == this.reenteredPassword) {
                    this.storage.set('password', this.newPassword).then((val) => {
                        if (val) {
                            this.popover.dismiss();
                        }
                    });
                } else {
                    this.errorMsg = 'New Passowords Do Not Match';
                }
            } else {
                this.errorMsg = 'Incorrect Old Password';
            }
        });
    }
}
