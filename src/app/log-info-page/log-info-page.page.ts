import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
import {NavController, ToastController, AlertController} from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
    selector: 'app-log-info-page',
    templateUrl: './log-info-page.page.html',
    styleUrls: ['./log-info-page.page.scss'],
})
export class LogInfoPagePage implements OnInit {
    fullName: string;
    email: any;
    homeNumber: number;
    workNumber: number;
    mobileNumber: number;
    additionalInfo: any;
    subscriptionTitle = 'Set Title from settings';
    imageURL = '../assets/img/default-logo.png';
    showTitle: any;
    showLogo: any;
    constructor(private storage: Storage, private router: Router,
                private navController: NavController, private toastController: ToastController,
                private alertController: AlertController, private androidPermissions: AndroidPermissions) {

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
            result => console.log('Has permission?',result.hasPermission),
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        );

        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    }

    ngOnInit() {
        this.storage.set('logViewAuth', false);
        this.storage.get("password").then((val) => {
            if(val == null){
                this.presentAlertPrompt();
            }
        });
        this.storage.get("title").then((val)=>{
            if(val != null){
                this.subscriptionTitle = val;
            }
        });
        this.storage.get("logo").then((val)=> {
            if(val != null){
                this.imageURL = val;
            }
        });
      this.storage.get("showTitle").then((val)=>{
           if(val !=null){
               this.showTitle = val;
           }
       });
      this.storage.get("showLogo").then((val)=>{
          if(val !=  null){
              console.log(val);
              this.showLogo = val;
          }
      });
    }

    subscribe() {
        let date = new Date();
        let data = {
            fullName: this.fullName,
            email: this.email,
            homeNumber: this.homeNumber,
            workNumber: this.workNumber,
            mobileNumber: this.mobileNumber,
            additionalInfo: this.additionalInfo,
            date: date,
        };
        this.storage.get(this.email).then((val) => {

            if(val == null){
                this.storage.set(this.email, data).then((val) =>{
                    this.clearInput();
                });
            } else {
                this.presentToastUnsuccessful(this.email);
            }
        });
    }
    /* Testing code for storage*/
    printAll(email) {
        this.storage.get(email).then((val) => {
            console.log('your name is ', val);
        });
    }
    doRefresh(event) {
        this.clearInput();

        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 1000);
    }
    clearInput(){
        this.fullName = '';
        this.email = '';
        this.mobileNumber = null;
        this.workNumber = null;
        this.homeNumber = null;
        this.additionalInfo = '';
        this.presentToast();
    }
    setPassword(password){
        this.storage.set('password', password).then((val)=>{
            this.presentToast();
        });
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
    async presentAlertPrompt() {
        const alert = await this.alertController.create({
            header: 'Setup New Password',
            subHeader: "",
            inputs: [
                {
                    name: 'password1',
                    type: 'password',
                    placeholder: 'Enter Password',
                },
                {
                    name: 'password2',
                    type: 'password',
                    placeholder: 'Re-enter Password',
                },
            ],
            buttons: [
                {
                    text: 'Ok',
                    handler: data => {
                        if(data.password1 != data.password2) {
                            alert.subHeader = 'Password Do Not Match!';
                            return false;
                        } else if (data.password1 == "" || data.password2 == ""){
                            alert.subHeader = 'Password Connot Be Empty';
                            return false;
                        } else {
                            this.setPassword(data.password1);
                            return true;
                        }
                    },

                }
            ],
            backdropDismiss: false,
        });

        await alert.present();
    }
}
