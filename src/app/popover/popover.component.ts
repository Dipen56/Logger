import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, AlertController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
    key: any;
    constructor(private navParams: NavParams, private popoverController: PopoverController,
                private storage: Storage, private alertController: AlertController,
                private toastController: ToastController, private router: Router) { }

    ngOnInit() {
        this.key = this.navParams.get('log_key');
    }
    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            header: 'Confirm!',
            message: 'Are you sure! <strong> Once deleted can not be undone. </strong>!!!',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        this.deleteLog();
                        this.logDeletedMessage();
                        this.router.navigateByUrl('/view-logs-page');

                    }
                }
            ]
        });

        await alert.present();
    }
    deleteLog() {
        this.storage.remove(this.key);
    }
    async logDeletedMessage (){
        const toast = await this.toastController.create({
            message: 'Log deleted successfully.',
            duration: 2000
        });
        toast.present();
    }
}
