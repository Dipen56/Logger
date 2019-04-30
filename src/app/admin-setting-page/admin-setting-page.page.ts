import { Component, OnInit } from '@angular/core';
import {ChangePasswordPopoverComponent} from '../change-password-popover/change-password-popover.component';

@Component({
  selector: 'app-admin-setting-page',
  templateUrl: './admin-setting-page.page.html',
  styleUrls: ['./admin-setting-page.page.scss'],
})
export class AdminSettingPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
    // async presentChangePasswordPopover(ev: Event) {
    //     var popover = await this.popoverController.create({
    //         component: ChangePasswordPopoverComponent,
    //         event: ev,
    //         translucent: true,
    //         // componentProps: {
    //         //     //popover: popover
    //         // }
    //     });
    //     await popover.present();
    // }
    //
    // async clearData() {
    //     await this.storage.clear();
    //     this.presentToastDeleteData();
    // }
    // async presentToastDeleteData() {
    //     const toast = await this.toastController.create({
    //         message: 'Successful, all data is cleared',
    //         duration: 1500
    //     });
    //     toast.present();
    // }
    // async presentDeleteConformationAlert() {
    //
    //     const alert = await this.alertController.create({
    //         header: 'Warning! Clearing Data',
    //         message: '<strong>This action will permanently delete all the stored data.</strong>',
    //         buttons: [
    //             {
    //                 text: 'Cancel',
    //                 role: 'cancel',
    //                 cssClass: 'secondary',
    //                 handler: (blah) => {
    //                     console.log('Confirm Cancel: blah');
    //                 }
    //             }, {
    //                 text: 'Okay',
    //                 handler: () => {
    //                     this.clearData();
    //                 }
    //             }
    //         ],
    //         backdropDismiss: false,
    //     });
    //
    //     await alert.present();
    //
    // }

}
