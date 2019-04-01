import { Component, OnInit, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
import {Events, AlertController, PopoverController} from '@ionic/angular';


@Component({
    selector: 'app-view-logs-page',
    templateUrl: './view-logs-page.page.html',
    styleUrls: ['./view-logs-page.page.scss'],
})
export class ViewLogsPagePage implements OnInit {
    logs = [];
    isSelectMode = false;
    isHidden= true;
    selcetedLogs = [];
    isChecked = false;
    constructor(private storage: Storage, private router: Router,
                private events: Events, private zone: NgZone,
                private alertController: AlertController) {
        // used to refresh the screen.
        this.events.subscribe('updateScreen', () => {

            this.zone.run(() => {
                console.log('force update the screen');
            });
        });
    }
    ngOnInit() {
        this.loadAllLogs();
    }
    goToLogDetailPage(id) {
        if(!this.isSelectMode){
            this.router.navigateByUrl('/view-logs-page/' + id);
        }
    }
    async loadAllLogs() {
        this.logs = [];
        await this.storage.forEach((value, key, index) => {
            if(key != 'password' && key != 'showTitle' && key != 'showLogo'){
                this.logs.push(value);
            }
        });
    }

    pressEvent(key){
        this.isHidden = false;
        this.isSelectMode = true;
        this.events.publish('updateScreen');
        //window.location.reload();
    }
    addSelectedLog(key){
        if(this.selcetedLogs.includes(key)){
            this.selcetedLogs = this.selcetedLogs.filter(function(value, index, arr){
                return value !== key;
            });
        } else {
            this.selcetedLogs.push(key);
        }
        console.log(this.selcetedLogs);
    }
    // this not workign yet
    selectALl(){
        if(!this.isChecked) {
            for(let log of this.logs ){
                let key = log.email;
                this.selcetedLogs.push(key);
            }
            this.isChecked = true;
        } else {
            this.selcetedLogs = [];
            this.isChecked = false;
        }
        this.events.publish('updateScreen');
    }
    deleteLog(){
        if(!this.isChecked) {
            if (this.selcetedLogs.length != 0) {
                for (let key of this.selcetedLogs) {
                    this.removeFromStorage(key);
                }
            }
        } else {
            for (let key of this.selcetedLogs) {
                this.removeFromStorage(key);
            }
        }
        this.loadAllLogs();
        if(this.logs.length === 0){
            this.isSelectMode = false;
        }
        this.events.publish('updateScreen');
    }
   async deleteAllLogsAlert(){
       const alert = await this.alertController.create({
           header: 'Confirm!',
           message: '<strong>Are you sure this will delete logs</strong>!',
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
                       this.deleteLog();
                   }
               }
           ]
       });

       await alert.present();
    }
    removeFromStorage(key){
        this.storage.remove(key);
    }
    exitSelectAll(){
        this.isSelectMode = false;
        this.events.publish('updateScreen');
    }
}
