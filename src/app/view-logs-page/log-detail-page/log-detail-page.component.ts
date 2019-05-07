import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {CallNumber} from '@ionic-native/call-number';
import {MenuController, PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../../popover/popover.component';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Alert} from 'selenium-webdriver';

@Component({
    selector: 'app-log-detail-page',
    templateUrl: './log-detail-page.component.html',
    styleUrls: ['./log-detail-page.component.scss']
})
export class LogDetailPageComponent implements OnInit {

    log: any;
    logKey: any;
    eventID: any;
    fullName: any;
    email: any;
    homeNumber: any;
    mobileNumber: any;
    addtionalInformation: any;
    date: any;
    eventName: any;

    constructor(private storage: Storage, private route: ActivatedRoute,
                private popoverController: PopoverController, private socialSharing: SocialSharing,
                private router: Router, private menuController: MenuController) {
        this.eventID = this.route.snapshot.paramMap.get('id');
        this.logKey = this.route.snapshot.paramMap.get('email');
    }

    ngOnInit() {
        this.loadLog();
    }

    ionViewWillEnter() {
        this.menuController.enable(false, 'admin-panel');
        this.menuController.enable(false, 'public-panel');
        this.menuController.enable(true, 'sub-panel');
    }

    async loadLog() {
        await this.storage.get('events').then(events => {
            if (events != null) {
                for (let event of events) {
                    if (event.eventID == this.eventID) {
                        for (let log of event.logs) {
                            if (log.email == this.logKey) {
                                this.eventName = event.eventName;
                                this.log = log;
                                this.fullName = this.log.fullName;
                                this.email = this.log.email;
                                this.homeNumber = this.log.homeNumber;
                                this.mobileNumber = this.log.mobileNumber;
                                this.addtionalInformation = this.log.additionalInfo;
                                if (this.homeNumber == undefined) {
                                    this.homeNumber = 'No Home Number';
                                }
                                if (this.addtionalInformation == undefined) {
                                    this.addtionalInformation = 'No Additional Information';
                                }
                                this.date = this.log.date;
                            }
                        }
                    }
                }
            }
        });
    }

    async presentPopover(ev: Event) {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            event: ev,
            translucent: true,
            componentProps: {
                eventID: this.eventID,
                log_key: this.logKey
            }
        });
        popover.onDidDismiss().then(val => {
            this.router.navigateByUrl('view-logs-page/' + this.eventID);
        });
        return await popover.present();
    }

    sendEmail() {
        // Check if sharing via email is supported
        this.socialSharing.canShareViaEmail().then(() => {
            // Share via email
            this.socialSharing.shareViaEmail('Thank you for attending the event...', this.eventName, [this.email]).then(() => {
            }).catch(() => {
                // Errore
            });
        }).catch(() => {
            // Sharing via email is not possible
        });
    }
}
