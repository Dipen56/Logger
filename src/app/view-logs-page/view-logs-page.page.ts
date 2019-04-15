import {Component, OnInit, NgZone} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {Events, AlertController, PopoverController} from '@ionic/angular';
import { ViewLogsPopoverComponent } from './view-logs-popover/view-logs-popover.component';


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
    searchQuery: any;

    constructor(private storage: Storage, private router: Router,
                private events: Events, private zone: NgZone,
                private alertController: AlertController, private popoverController: PopoverController) {
        // used to refresh the screen.
        this.events.subscribe('updateScreen', () => {

            this.zone.run(() => {
                console.log('force update the screen');
            });
        });
    }

    ngOnInit() {
        this.loadAllLogs();
        this.storage.get('logViewAuth').then((val) => {
            if (!val) {
                this.presentAlertPrompt('\'Enter admin password to access logs\'');
            }
        });
    }

    searchLogs() {
        let tempLogs = [];

        if (this.searchQuery == '') {
            this.loadAllLogs();
        } else {
            for (let log of this.copyLogs) {
                if (log.email.startsWith(this.searchQuery)) {
                    tempLogs.push(log);
                }
            }
        }
        this.logs = [];
        this.logs = tempLogs;
        console.log(this.logs);
    }

    goToLogDetailPage(id) {
        if (!this.isSelectMode) {
            this.router.navigateByUrl('/view-logs-page/' + id);
        }
    }

    async loadAllLogs() {
        this.logs = [];
        await this.storage.forEach((value, key, index) => {
            if (key != 'password' && key != 'showTitle' && key != 'showLogo' && key != 'logViewAuth' && key != 'logo') {
                this.logs.push(value);
            }
        });
        this.copyLogs = this.logs;
    }

    pressEvent(key) {
        this.isHidden = false;
        this.isSelectMode = true;
        this.events.publish('updateScreen');
        //window.location.reload();
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

    deleteLog() {
        if (!this.isChecked) {
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
        if (this.logs.length === 0) {
            this.isSelectMode = false;
        }
        this.events.publish('updateScreen');
    }

    async presentPopover(ev: Event) {
        const popover = await this.popoverController.create({
            component: ViewLogsPopoverComponent,
            event: ev,
            translucent: true,
            componentProps: {
                log_key: this.key
            }
        });
        return await popover.present();
    }

    async deleteAllLogsAlert() {
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

    removeFromStorage(key) {
        this.storage.remove(key);
    }

    exitSelectAll() {
        this.isSelectMode = false;
        this.events.publish('updateScreen');
    }

    async presentAlertPrompt(errMessage) {
        const alert = await this.alertController.create({
            header: 'Authentication!',
            subHeader: errMessage,
            inputs: [
                {
                    name: 'password1',
                    type: 'password',
                    placeholder: 'Enter Password',
                }
            ],
            buttons: [
                {
                    text: 'Ok',
                    handler: data => {
                        this.storage.get('password').then((val) => {
                            if (data.password1 != val) {
                                this.presentAlertPrompt('Password is incorrect try again');
                                return false;
                            } else {
                                this.storage.set('logViewAuth', true);
                                return true;
                            }
                        });
                    },

                }
            ],
            backdropDismiss: false,
        });

        await alert.present();
    }
}
