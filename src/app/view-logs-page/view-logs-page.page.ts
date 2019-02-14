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
}
