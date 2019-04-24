import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
    selector: 'app-add-event-modal',
    templateUrl: './add-event-modal.component.html',
    styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent implements OnInit {
    myParameter: boolean;
    myOtherParameter: Date;

    constructor(private modalController: ModalController, private navParams: NavParams) {
    }

    ngOnInit() {
       // this.myParameter = this.navParams.get('aParameter');
       // this.myOtherParameter = this.navParams.get('otherParameter');
    }

    async myDismiss() {
       // const result: Date = new Date();

        //await this.modalController.dismiss(result);
    }
}
