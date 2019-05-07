import {Component, OnInit} from '@angular/core';
import {ChangePasswordPopoverComponent} from '../change-password-popover/change-password-popover.component';
import {AlertController, MenuController, PopoverController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-admin-setting-page',
    templateUrl: './admin-setting-page.page.html',
    styleUrls: ['./admin-setting-page.page.scss'],
})
/* This class is used to show the admin setting panel*/
export class AdminSettingPagePage implements OnInit {
    constructor(private menuController: MenuController, private popoverController: PopoverController,
                private alertController: AlertController, private router: Router,
                private storage: Storage, private toastController: ToastController) {
    }

    ngOnInit() {
    }

    /* Used to change the nav menu */
    ionViewWillEnter() {
        this.menuController.enable(true, 'admin-panel');
        this.menuController.enable(false, 'public-panel');
        this.menuController.enable(false, 'sub-panel');
    }

    async presentChangePasswordPopover(ev: Event) {
        let popover = await this.popoverController.create({
            component: ChangePasswordPopoverComponent,
            event: ev,
            translucent: true,
            // componentProps: {
            //     //popover: popover
            // }
        });
        await popover.present();
    }

    /* Used to delete all the data in the app*/
    async clearData() {
        await this.storage.clear();
        this.presentToastSuccess('All Data Has Been Deleted!');
        this.router.navigateByUrl('signup-page');
    }

    async presentDeleteConformationAlert() {
        const alert = await this.alertController.create({
            header: 'Warning! Clearing Data',
            message: '<strong>This action will permanently delete all the stored data.</strong>',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        this.clearData();
                    }
                }
            ],
            backdropDismiss: false,
        });

        await alert.present();

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
