import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController, ToastController, AlertController, MenuController} from '@ionic/angular';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {File} from '@ionic-native/file/ngx';

@Component({
    selector: 'app-log-info-page',
    templateUrl: './log-info-page.page.html',
    styleUrls: ['./log-info-page.page.scss'],
})
export class LogInfoPagePage implements OnInit {
    fullName: string;
    email: any;
    homeNumber: number;
    mobileNumber: number;
    additionalInfo: any = '';
    eventTitle: string;
    logo: any = 'assets/img/default-logo.png';
    showTitle: any;
    showLogo: any;
    eventID: any;
    eventObject: any;

    constructor(private storage: Storage, private router: Router,
                private navController: NavController, private toastController: ToastController,
                private alertController: AlertController, private androidPermissions: AndroidPermissions,
                private file: File, private route: ActivatedRoute, private menuController: MenuController) {

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
            result => console.log('Has permission?', result.hasPermission),
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        );
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

    }

    ngOnInit() {
        this.eventID = this.route.snapshot.paramMap.get('id');
        this.findEvents();

        this.storage.get('showTitle').then((val) => {
            if (val != null) {
                this.showTitle = val;
            }
        });

        this.storage.get('showLogo').then((val) => {
            if (val != null) {

                this.showLogo = val;
            }
        });
    }

    ionViewWillEnter() {
        this.menuController.enable(false, 'admin-panel');
        this.menuController.enable(true, 'public-panel');
        this.menuController.enable(false, 'sub-panel');
    }

    async findEvents() {
        await this.storage.get('events').then(events => {
            for (let event of events) {
                if (event.eventID == this.eventID) {
                    this.eventObject = event;
                    this.eventTitle = event.eventName;
                    this.logo = event.logo;
                }
            }

        });
    }

    subscribe() {
        this.addEvent();
    }

    doRefresh(event) {
        this.clearInput();

        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 1000);
    }

    clearInput() {
        this.fullName = '';
        this.email = '';
        this.mobileNumber = null;
        this.homeNumber = null;
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

    async addEvent() {
        let tempEvent = [];
        await this.storage.get('events').then(events => {
            if (events != null) {
                tempEvent = events;
                for (let i in events) {
                    if (events[i].eventID == this.eventID) {
                        let newLogs = events[i].logs;
                        let date = new Date();
                        newLogs.push({
                            fullName: this.fullName.trim(),
                            email: this.email.trim(),
                            homeNumber: this.homeNumber,
                            mobileNumber: this.mobileNumber,
                            additionalInfo: this.additionalInfo.trim(),
                            date: date,
                        });
                        let data = {
                            eventID: events[i].eventID,
                            eventName: events[i].eventName,
                            location: events[i].location,
                            dateTime: events[i].dateTime,
                            logo: events[i].logo,
                            eventDisc: events[i].eventDisc,
                            logs: newLogs
                        };
                        tempEvent[i] = data;
                        this.storage.set('events', tempEvent).then(val => {
                            this.presentToastSuccess('Subscription Saved');
                            this.clearInput();
                        });
                    }
                }
            }
        });
    }
}
