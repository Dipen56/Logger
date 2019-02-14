import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavigationEnd, Router} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-log-info-page',
    templateUrl: './log-info-page.page.html',
    styleUrls: ['./log-info-page.page.scss'],
})
export class LogInfoPagePage implements OnInit {
    title: any = 'Enter details here...';
    fullName: string;
    email: any;
    homeNumber: number;
    workNumber: number;
    mobileNumber: number;
    additionalInfo: any;
    constructor(private storage: Storage, private router: Router, private navController: NavController) { }

    ngOnInit() {
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
      this.storage.set(this.email, data);
      this.clearInput();
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
    }
}
