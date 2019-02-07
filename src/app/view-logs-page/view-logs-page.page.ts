import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
    selector: 'app-view-logs-page',
    templateUrl: './view-logs-page.page.html',
    styleUrls: ['./view-logs-page.page.scss'],
})
export class ViewLogsPagePage implements OnInit {
    logs = [];
    constructor(private storage: Storage, private router: Router) {
       this.loadAllLogs();
    }
    ngOnInit() {
    }
    goToLogDetailPage(id) {
        this.router.navigateByUrl('/view-logs-page/' + id);
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
}
