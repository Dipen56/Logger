import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {ChangePasswordPopoverComponent} from '../change-password-popover/change-password-popover.component';
import {SetTitlePopoverComponent} from '../set-title-popover/set-title-popover.component';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {Storage} from '@ionic/storage';
import {ToastController, AlertController} from '@ionic/angular';
import {FilePath} from '@ionic-native/file-path/ngx';
import {File} from '@ionic-native/file/ngx';
import {ActivatedRoute} from '@angular/router';

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

    constructor(private popoverController: PopoverController, private fileChooser: FileChooser,
                private storage: Storage, private toastController: ToastController,
                private alertController: AlertController, private filePath: FilePath,
                private file: File, private route: ActivatedRoute) {
        this.eventID = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.loadEvent();
    }

    async loadEvent() {
        await this.storage.get('events').then(events => {
            if (events != null) {
                for (let i in events) {
                    if (events[i].eventID == this.eventID) {
                        this.showTitle = events[i].showTitle;
                        this.showLogo = events[i].showImage;
                        this.image = events[i].logo;
                        this.eventName = events[i].eventName;
                    }
                }
            }
        });
    }

    // async presentTitlePopover(ev: Event) {
    //     var popover = await this.popoverController.create({
    //         component: SetTitlePopoverComponent,
    //         event: ev,
    //         translucent: true
    //     });
    //     popover.onDidDismiss().then((detail) => {
    //         if (detail !== null) {
    //             console.log('The result:', detail.data);
    //         }
    //     });
    //     await popover.present();
    //
    // }


    async persentFileChooser() {
        await this.fileChooser.open().then((uri) => {
            this.filePath.resolveNativePath(uri).then((filePath) => {
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = filePath.substring(filePath.lastIndexOf('/') + 1);
                this.file.copyFile(correctPath, currentName, this.file.dataDirectory, currentName).then(res => {
                    this.storage.set('logo', currentName).then((val) => {
                        if (val != null) {
                            this.presentToast();
                        }
                    });
                });
            });
        });
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Successful, information have been saved.',
            duration: 1500
        });
        toast.present();
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
                                eventName: this.eventName,
                                location: events[i].location,
                                dateTime: events[i].dateTime,
                                logo: this.image,
                                eventDisc: events[i].eventDisc,
                                showTitle: this.showTitle,
                                showImage: this.showLogo,
                                logs: events[i].logs
                            };
                            tempEvent[i] = data;
                            this.storage.set('events', tempEvent).then(val => {
                                //this.presentToastSuccess('Log Deleted');
                            });
                        }
                    }
                }
            });
    }
}
