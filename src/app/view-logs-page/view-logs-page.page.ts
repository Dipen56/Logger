import {Component, OnInit, NgZone} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, AlertController, PopoverController} from '@ionic/angular';
import {ViewLogsPopoverComponent} from './view-logs-popover/view-logs-popover.component';

@Component({
    selector: 'app-view-logs-page',
    templateUrl: './view-logs-page.page.html',
    styleUrls: ['./view-logs-page.page.scss'],
})
export class ViewLogsPagePage implements OnInit {
    logs = [];
    copyLogs = [];
    isSelectMode = false;
    isHidden = true;
    selcetedLogs = [];
    isChecked = false;
    searchQuery: string;
    eventID: any;

    constructor(private storage: Storage, private router: Router,
                private events: Events, private zone: NgZone,
                private alertController: AlertController, private popoverController: PopoverController,
                private route: ActivatedRoute) {
        // used to refresh the screen.
        this.events.subscribe('updateScreen', () => {
            this.zone.run(() => {
                console.log('force update the screen');
            });
        });
    }

    ngOnInit() {
        this.eventID = this.route.snapshot.paramMap.get('id');
        this.loadAllLogs();
    }

    updateScreen() {
        this.events.publish('updateScreen');
    }

    searchLogs() {
        let tempLogs = [];
        if (this.searchQuery == '') {
            this.loadAllLogs();
        } else {
            for (let log of this.copyLogs) {
                if (log.email.toUpperCase().startsWith(this.searchQuery.toUpperCase())) {
                    tempLogs.push(log);
                }
            }
        }
        this.logs = [];
        this.logs = tempLogs;
    }

    async loadAllLogs() {
        this.logs = [];
        await this.storage.get('events').then(events => {
            for (let event of events) {
                if (event.eventID == this.eventID) {
                    this.logs = event.logs;
                }
            }
        });
        this.copyLogs = this.logs;
    }

    pressEvent(key) {
        this.isHidden = false;
        this.isSelectMode = true;
        this.events.publish('updateScreen');
    }

    addSelectedLog(key) {
        if (this.selcetedLogs.includes(key)) {
            this.selcetedLogs = this.selcetedLogs.filter(function (value, index, arr) {
                return value !== key;
            });
        } else {
            this.selcetedLogs.push(key);
        }
    }

    // this not workign yet
    selectALl() {
        if (!this.isChecked) {
            for (let log of this.logs) {
                console.log(log);
                let key = log.email;
                if (!this.selcetedLogs.includes(key)) {
                    this.selcetedLogs.push(key);
                }
            }
            this.isChecked = true;
        } else {
            this.selcetedLogs = [];
            this.isChecked = false;
        }
        this.events.publish('updateScreen');
    }

    deselectLogs() {
        this.isSelectMode = false;
        this.selcetedLogs = [];
        this.isChecked = false;
    }

    async presentPopover(ev: Event) {
        const popover = await this.popoverController.create({
            component: ViewLogsPopoverComponent,
            event: ev,
            translucent: true,
            componentProps: {
                selectedLogs: this.selcetedLogs,
                eventID: this.eventID
            }
        });
        popover.onDidDismiss().then((e) => {
            this.deselectLogs();
            this.loadAllLogs();
            this.events.publish('updateScreen');
        });
        return await popover.present();
    }

}
