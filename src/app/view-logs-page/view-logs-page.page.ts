import { Component, OnInit, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
import {Events} from '@ionic/angular';

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
                private events: Events, private zone: NgZone) {
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
    loadAllLogs() {
        this.logs = [];
        this.storage.forEach((value, key, index) => {
            this.logs.push(value);
            console.log(value);
        });
    }
    clearAllValue() {
        this.storage.clear();
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
            this.isChecked = true;
        } else {
            this.isChecked = false;
        }
        this.events.publish('updateScreen');
    }
    deleteLog(){
        let count = 0;
        if(this.selcetedLogs.length != 0) {
            for(let log of this.selcetedLogs){
                this.storage.remove(log);
                count++;
            }
        }
        this.loadAllLogs();
        this.events.publish('updateScreen');
    }

}
