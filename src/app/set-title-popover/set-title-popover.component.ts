import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavParams,ToastController} from '@ionic/angular';

@Component({
  selector: 'app-set-title-popover',
  templateUrl: './set-title-popover.component.html',
  styleUrls: ['./set-title-popover.component.scss']
})
export class SetTitlePopoverComponent implements OnInit {
  subscriptionTitle: any;
  popover: any;
  constructor(private storage: Storage, private navParams: NavParams,
              private toastController: ToastController) {
    this.popover = this.navParams.get('popover');
  }

  ngOnInit() {
  }

  setTitle() {
    this.storage.set('title', this.subscriptionTitle).then((val)=>{
      this.popover.dismiss();
        this.presentToast();
    });
  }
    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Successful, information have been saved.',
            duration: 1500
        });
        toast.present();
    }

}
