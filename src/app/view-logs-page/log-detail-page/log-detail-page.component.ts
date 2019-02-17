import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import {PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../../popover/popover.component';



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

    constructor(private storage: Storage, private route: ActivatedRoute, private popoverController: PopoverController) {
        this.key = this.route.snapshot.paramMap.get('id');
        // Or to get a key/value pair
        storage.get(this.key).then((val) => {
            this.log = val;
            this.fullName = val.fullName;
            this.email = val.email;
            this.homeNumber = val.homeNumber;
            this.workNumber = val.workNumber;
            this.mobileNumber = val.mobileNumber;
            this.addtionalInformation = val.additionalInfo;
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
}