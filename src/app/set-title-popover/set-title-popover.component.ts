import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavParams, PopoverController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-set-title-popover',
    templateUrl: './set-title-popover.component.html',
    styleUrls: ['./set-title-popover.component.scss']
})
export class SetTitlePopoverComponent implements OnInit {
    subscriptionTitle: any;

    constructor(private storage: Storage, private navParams: NavParams,
                private toastController: ToastController, private popoverController: PopoverController) {
    }

    ngOnInit() {
    }

    setTitle() {
        this.closePopover();
        this.presentToastSuccess('The Title is Set.');
    }

    async closePopover() {
        await this.popoverController.dismiss(this.subscriptionTitle);
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
