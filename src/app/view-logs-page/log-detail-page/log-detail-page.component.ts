import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage';

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
  home: any;
  work: any;
  mobile: any;
  addtionalInformation: any;
  date: any;

  constructor(private storage: Storage, private route: ActivatedRoute) {
    this.key = this.route.snapshot.paramMap.get('id');
      // Or to get a key/value pair
      storage.get(this.key).then((val) => {
        this.log = val;
        this.fullName = val.fullName;
        this.email = val.email;
        this.home = val.homeNumber;
        this.work = val.workNumber;
        this.mobile = val.mobileNumber;
        this.addtionalInformation = val.additionalInfo;
        this.date = val.date;
      });
  }

  ngOnInit() {
  }

}
