import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {FilePath} from '@ionic-native/file-path/ngx';
import {File} from '@ionic-native/file/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';

@Component({
    selector: 'app-add-event-modal',
    templateUrl: './add-event-modal.component.html',
    styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent implements OnInit {
    eventName = '';
    location = '';
    dateTime: any;
    logo: any;
    eventDisc = '';

    constructor(private modalController: ModalController, private navParams: NavParams,
                private storage: Storage, private toastController: ToastController, private filePath: FilePath,
                private file: File, private fileChooser: FileChooser) {
    }

    ngOnInit() {
        // this is how you get data from another page to the modal.
        // this.myParameter = this.navParams.get('aParameter');
        // this.myOtherParameter = this.navParams.get('otherParameter');
    }

    async submit() {
        //this.storage.remove('events');
        let showImage = false;
        if (this.logo != undefined) {
            showImage = true;
        }
        if (this.checkFields()) {
            await this.storage.get('events').then(val => {
                if (val == null) {
                    let data = [{
                        eventID: this.generateID(),
                        eventName: this.eventName.trim(),
                        location: this.location.trim(),
                        dateTime: this.dateTime,
                        logo: this.logo,
                        eventDisc: this.eventDisc.trim(),
                        logs: [],
                        showTitle: true,
                        showImage: showImage,
                    }];
                    this.storage.set('events', data).then(val => {
                        if (val != null) {
                            this.presentToastSuccess('Event has been saved');
                            this.closeModal();
                        }
                    });
                } else {
                    let newData = [];
                    for (let i of val) {
                        let data = i;
                        newData.push(data);
                    }
                    let newVal = {
                        eventID: this.generateID(),
                        eventName: this.eventName.trim(),
                        location: this.location.trim(),
                        dateTime: this.dateTime,
                        logo: this.logo,
                        eventDisc: this.eventDisc.trim(),
                        logs: [],
                        showTitle: true,
                        showImage: showImage,
                    };
                    newData.push(newVal);
                    this.storage.set('events', newData).then(val => {
                        if (val != null) {
                            this.presentToastSuccess('Event has been saved');
                            this.closeModal();
                        }
                    });
                }
            });
        } else {
            this.presentToastError('All fields need to be filled in.');
        }

        // const result: Date = new Date();
        // This is how you pass data between modals
        //await this.modalController.dismiss(result);
    }

    checkFields(): boolean {
        if (this.eventName.trim() == '' || this.location.trim() == ''
            || this.dateTime.trim() == undefined || this.eventDisc.trim() == '') {
            return false;
        } else {
            return true;
        }
    }

    async closeModal() {
        await this.modalController.dismiss();
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

    async persentFileChooser() {
        await this.fileChooser.open().then((uri) => {
            this.filePath.resolveNativePath(uri).then((filePath) => {
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = filePath.substring(filePath.lastIndexOf('/') + 1);
                this.file.copyFile(correctPath, currentName, this.file.dataDirectory, currentName).then(res => {
                    //this.logo = currentName;
                    this.file.readAsDataURL(this.file.dataDirectory, currentName).then(img => {
                        this.logo = img;
                    });
                });
            });
        });
    }

    generateID() {
        return Math.random().toString(36).substr(2, 9);
    }
}
