import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Storage} from '@ionic/storage';
import {CallNumber} from '@ionic-native/call-number';
import {PopoverController} from '@ionic/angular';
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
    key: any;
    fullName: any;
    email: any;
    homeNumber: any;
    workNumber: any;
    mobileNumber: any;
    addtionalInformation: any;
    date: any;

    constructor(private storage: Storage, private route: ActivatedRoute,
                private popoverController: PopoverController, private socialSharing: SocialSharing) {
        this.key = this.route.snapshot.paramMap.get('id');
        // Or to get a key/value pair
        storage.get(this.key).then((val) => {
            this.log = val;
            this.fullName = val.fullName;
            this.email = val.email;
            this.homeNumber = val.homeNumber;
            console.log(this.homeNumber);
            if (this.homeNumber == undefined) {
                this.homeNumber = 'N/A';
            }
            this.workNumber = val.workNumber;
            if (this.workNumber == undefined) {
                this.workNumber = 'N/A';
            }
            this.mobileNumber = val.mobileNumber;
            if (this.mobileNumber == undefined) {
                this.mobileNumber = 'N/A';
            }
            this.addtionalInformation = val.additionalInfo;
            if (this.addtionalInformation == undefined) {
                this.addtionalInformation = 'No additional information';
            }
            this.date = val.date;
        });
    }

    ngOnInit() {
    }

    async presentPopover(ev: Event) {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            event: ev,
            translucent: true,
            componentProps: {
                log_key: this.key
            }
        });
        return await popover.present();
    }

    makeCall(number) {
    }

    sendEmail() {
        // Check if sharing via email is supported
        this.socialSharing.canShareViaEmail().then(() => {
            // Share via email
            this.socialSharing.shareViaEmail('Body', 'Subject', [this.email]).then(() => {
            }).catch(() => {
                // Errore
            });
        }).catch(() => {
            // Sharing via email is not possible
        });

    }

}
