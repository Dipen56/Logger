import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
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
    location: any;
    dateTime: any;
    eventDisc: any;

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
                            location: this.location,
                            dateTime: this.dateTime,
                            logo: this.image,
                            eventDisc: this.eventDisc,
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
