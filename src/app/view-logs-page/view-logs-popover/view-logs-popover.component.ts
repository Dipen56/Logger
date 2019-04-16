import {Component, OnInit, NgZone} from '@angular/core';
import {ViewLogsPagePage} from '../view-logs-page.page';
import {Events} from '@ionic/angular';
import {NavParams, PopoverController, AlertController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';


@Component({
    selector: 'app-view-logs-popover',
    templateUrl: './view-logs-popover.component.html',
    styleUrls: ['./view-logs-popover.component.scss']
})
export class ViewLogsPopoverComponent implements OnInit {
    popover: any;
    selectedLogs: any;

    constructor(private viewLogPage: ViewLogsPagePage, private popoverController: PopoverController,
                private navParams: NavParams, private storage: Storage, private alertController: AlertController,
                private socialSharing: SocialSharing, private toastController: ToastController) {
        this.selectedLogs = this.navParams.get('selectedLogs');
        // popover is implied?
        //this.popover = this.navParams.get('popover');
    }

    ngOnInit() {
    }

    exitSelectAll() {
        this.popover.dismiss();
    }

    emailSelectedLogs() {
        // Check if sharing via email is supported
        this.socialSharing.canShareViaEmail().then(() => {
            // Share via email
            let to = this.selectedLogs;
            this.socialSharing.shareViaEmail('Body', 'Subject', to).then(() => {
                this.popover.dismiss();
            }).catch(() => {
                // Errore
            });
        }).catch(() => {
            // Sharing via email is not possible
        });
    }

    async deleteAllLogsAlert() {
        const alert = await this.alertController.create({
            header: 'Confirm!',
            message: '<strong>Are you sure this will delete logs</strong>!',
            buttons: [
                 {
                    text: 'Okay',
                    handler: () => {
                        this.deleteLog();
                        this.logDeletedMessage();
                    }
                }
            ]
        });
        await alert.present();
    }

    deleteLog() {
        if (this.selectedLogs.length != 0) {
            for (let key of this.selectedLogs) {
                this.removeFromStorage(key);
            }
        }
        this.popover.dismiss();
    }

    removeFromStorage(key) {
        this.storage.remove(key);
    }

    async logDeletedMessage() {
        const toast = await this.toastController.create({
            message: 'Logs deleted successfully.',
            duration: 2000
        });
        toast.present();
    }
}
