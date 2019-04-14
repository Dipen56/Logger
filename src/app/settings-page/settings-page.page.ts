import { Component, OnInit } from '@angular/core';
import { PopoverController} from '@ionic/angular';
import {ChangePasswordPopoverComponent} from '../change-password-popover/change-password-popover.component';
import {SetTitlePopoverComponent} from '../set-title-popover/set-title-popover.component';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {Storage} from '@ionic/storage';
import {ToastController, AlertController} from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.page.html',
    styleUrls: ['./settings-page.page.scss'],
})
export class SettingsPagePage implements OnInit {
    showTitle: any;
    showLogo: any;
    constructor(private popoverController: PopoverController, private fileChooser: FileChooser,
                private storage: Storage, private toastController: ToastController,
                private alertController: AlertController, private filePath: FilePath,
                private file: File) { }

    ngOnInit() {
        this.storage.set('logViewAuth', false);
        this.storage.get("showTitle").then((val)=>{
            if(val != null){
                this.showTitle = val;
            }
        });
        this.storage.get("showLogo").then((val)=>{
            if(val != null){
                this.showLogo = val;
            }
        });
    }
    toggleTitle(){
        this.storage.set('showTitle', this.showTitle);
    }

    toggleLogo(){
        this.storage.set('showLogo', this.showLogo);
    }
    async presentChangePasswordPopover(ev: Event) {
        var popover = await this.popoverController.create({
            component: ChangePasswordPopoverComponent,
            event: ev,
            translucent: true,
            // componentProps: {
            //     //popover: popover
            // }
        });
        await popover.present();
    }
    async clearData(){
        await this.storage.clear();
        this.presentToastDeleteData();
    }

   async presentDeleteConformationAlert(){

            const alert = await this.alertController.create({
                header: 'Warning! Clearing Data',
                message: '<strong>This action will permanently delete all the stored data.</strong>',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Okay',
                        handler: () => {
                            this.clearData();
                        }
                    }
                ],
                backdropDismiss: false,
            });

            await alert.present();

    }

    async presentTitlePopover(ev: Event){
        var popover = await this.popoverController.create({
            component: SetTitlePopoverComponent,
            event: ev,
            translucent: true
        });
        await popover.present();
    }

    async persentFileChooser(){
        await this.fileChooser.open().then((uri) =>{
            this.filePath.resolveNativePath(uri).then((filePath) => {
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = filePath.substring(filePath.lastIndexOf('/') + 1);
                console.log(correctPath);
                console.log(currentName);
                console.log(this.file.dataDirectory);
                // This finds the asset directory
                // this.file.checkDir(this.file.applicationDirectory, 'assets/img/').then(_ => console.log('Directory exists')).catch(err =>
                //     console.log('Directory doesnt exist'));
                this.file.copyFile(correctPath, currentName, this.file.dataDirectory, currentName).then(res =>{
                    this.storage.set("logo", currentName).then((val)=> {
                        if(val != null){
                            this.presentToast();
                        }
                    });
                });
                // this.file.checkDir(this.file.dataDirectory, currentName).then(_ => console.log('Directory exists')).catch(err =>
                //   console.log('Directory doesnt exist'));
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
    async presentToastDeleteData() {
        const toast = await this.toastController.create({
            message: 'Successful, all data is cleared',
            duration: 1500
        });
        toast.present();
    }
}
