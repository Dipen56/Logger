import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController, ToastController, AlertController} from '@ionic/angular';
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
    additionalInfo: any;
    eventTitle: string;
    logo: any = 'assets/img/default-logo.png';
    showTitle: any;
    showLogo: any;
    eventID: any;
    eventObject: any;
    logs = [];

    constructor(private storage: Storage, private router: Router,
                private navController: NavController, private toastController: ToastController,
                private alertController: AlertController, private androidPermissions: AndroidPermissions,
                private file: File, private route: ActivatedRoute) {

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

    async findEvents() {
        await this.storage.get('events').then(events => {
            for (let event of events) {
                if (event.eventID == this.eventID) {
                    this.eventObject = event;
                    this.eventTitle = event.eventName;
                    this.logo = event.logo;
                    this.logo = event.logs;
                }
            }

        });
    }

    async addLog(data) {
        this.logs.push(data);
        await this.storage.get('events').then(events => {
            for (let event of events) {
                if (event.eventID == this.eventID) {
                    event.logs = this.logs;
                }
            }
        });
    }

    subscribe() {
        let date = new Date();
        let data = {
            fullName: this.fullName,
            email: this.email,
            homeNumber: this.homeNumber,
            mobileNumber: this.mobileNumber,
            additionalInfo: this.additionalInfo,
            date: date,
        };
        this.addLog(data);
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
        this.workNumber = null;
        this.homeNumber = null;
        this.additionalInfo = '';
        this.presentToast();
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Successful, information have been saved.',
            duration: 1500
        });
        toast.present();
    }

    async presentToastUnsuccessful(val) {
        const toast = await this.toastController.create({
            message: 'Unsuccessful subscription for email "' + val + '" exists.',
            duration: 1500
        });
        toast.present();
    }
}
