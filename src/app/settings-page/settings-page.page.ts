import {Component, OnInit} from '@angular/core';
import {MenuController, PopoverController} from '@ionic/angular';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {Storage} from '@ionic/storage';
import {ToastController, AlertController} from '@ionic/angular';
import {FilePath} from '@ionic-native/file-path/ngx';
import {File} from '@ionic-native/file/ngx';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.page.html',
    styleUrls: ['./settings-page.page.scss'],
})
export class SettingsPagePage implements OnInit {
    showTitle: any;
    showLogo: any;
    eventID: any;
    eventName: any;
    image: any;
    location: any;
    dateTime: any;
    eventDisc: any;

    constructor(private popoverController: PopoverController, private fileChooser: FileChooser,
                private storage: Storage, private toastController: ToastController,
                private alertController: AlertController, private filePath: FilePath,
                private file: File, private route: ActivatedRoute, private menuController: MenuController,
                private router: Router) {
        this.eventID = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.loadEvent();
    }

    ionViewWillEnter() {
        this.menuController.enable(false, 'admin-panel');
        this.menuController.enable(false, 'public-panel');
        this.menuController.enable(true, 'sub-panel');
    }

    async loadEvent() {
        await this.storage.get('events').then(events => {
            if (events != null) {
                for (let i in events) {
                    if (events[i].eventID == this.eventID) {
                        this.showTitle = events[i].showTitle;
                        this.showLogo = events[i].showImage;
                        this.location = events[i].location;
                        this.dateTime = events[i].dateTime;
                        this.eventDisc = events[i].eventDisc;
                        this.image = events[i].logo;
                        this.eventName = events[i].eventName;
                    }
                }
            }
        });
    }

    async persentFileChooser() {
        await this.fileChooser.open().then((uri) => {
            this.filePath.resolveNativePath(uri).then((filePath) => {
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = filePath.substring(filePath.lastIndexOf('/') + 1);
                this.file.copyFile(correctPath, currentName, this.file.dataDirectory, currentName).then(res => {
                    this.file.readAsDataURL(this.file.dataDirectory, currentName).then(img => {
                        this.image = img;
                    });
                });
            });
        });
    }

    async presentAlertDeleteEvent() {
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
                        this.deleteEvent();
                    }
                }
            ]
        });

        await alert.present();
    }


    async deleteEvent() {
        await this.storage.get('events').then(events => {
            if (events != null) {
                for (let i in events) {
                    if (events[i].eventID == this.eventID) {
                        events.splice(i, 1);
                    }
                }
            }
            this.storage.set('events', events).then(val => {
                this.router.navigateByUrl('dashboard-page');
                this.presentToastSuccess('Event Deleted');
            });
        });

    }

    async update() {
        let tempEvent = [];
        await this.storage.get('events').then(events => {
            if (events != null) {
                tempEvent = events;
                for (let i in events) {
                    if (events[i].eventID == this.eventID) {
                        let data = {
                            eventID: events[i].eventID,
                            eventName: this.eventName.trim(),
                            location: this.location.trim(),
                            dateTime: this.dateTime,
                            logo: this.image,
                            eventDisc: this.eventDisc.trim(),
                            showTitle: this.showTitle,
                            showImage: this.showLogo,
                            logs: events[i].logs
                        };
                        tempEvent[i] = data;
                        this.storage.set('events', tempEvent).then(val => {
                            this.presentToastSuccess('Event Updated');
                        });
                    }
                }
            }
        });
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
