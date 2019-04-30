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
    selectedLogs = [];
    eventID: any;

    constructor(private viewLogPage: ViewLogsPagePage, private popoverController: PopoverController,
                private navParams: NavParams, private storage: Storage, private alertController: AlertController,
                private socialSharing: SocialSharing, private toastController: ToastController) {
        // popover is implied?
        // this.popover = this.navParams.get('popover');
    }

    ngOnInit() {
        this.selectedLogs = this.navParams.get('selectedLogs');
        this.eventID = this.navParams.get('eventID');
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
                        this.closePopover();
                    }
                }
            ]
        });
        await alert.present();
    }

    async deleteLog() {
        let tempLogs = [];
        let tempEvent = [];
        await this.storage.get('events').then(events => {
            if (events != null) {
                tempEvent = events;
                for (let i in events) {
                    if (events[i].eventID == this.eventID) {
                        for (let j in events[i].logs) {
                            if (!this.selectedLogs.includes(events[i].logs[j].email)) {
                                tempLogs.push(events[i].logs[j]);
                            }
                        }
                            let data = {
                                eventID: events[i].eventID,
                                eventName: events[i].eventName,
                                location: events[i].location,
                                dateTime: events[i].dateTime,
                                logo: events[i].logo,
                                eventDisc: events[i].eventDisc,
                                showTitle: events[i].showTitle,
                                showImage: events[i].showImage,
                                logs: tempLogs
                            };
                            tempEvent[i] = data;
                            this.storage.set('events', tempEvent).then(val => {
                                this.presentToastSuccess('Log Deleted');
                            });
                    }
                }
            }
        });
    }

    async closePopover() {
        await this.popoverController.dismiss();
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
