import { Component, OnInit } from '@angular/core';

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
    constructor() {     }

    ngOnInit() {
    }
    subscribe(){
      
    }

}
