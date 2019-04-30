import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController, AlertController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
    logKey: any;
    eventID: any;

    constructor(private navParams: NavParams, private popoverController: PopoverController,
                private storage: Storage, private alertController: AlertController,
                private toastController: ToastController, private router: Router) {
    }

    ngOnInit() {
        this.logKey = this.navParams.get('log_key');
        this.eventID = this.navParams.get('eventID');
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
                        this.presentToastSuccess('Log Deleted');
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
                        tempLogs = events[i].logs;
                        for (let j in events[i].logs) {
                            if (events[i].logs[j].email == this.logKey) {
                                tempLogs.splice(parseInt(j, 10), 1);
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
