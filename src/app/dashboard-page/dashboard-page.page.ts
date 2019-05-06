import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {AddEventModalComponent} from './add-event-modal/add-event-modal.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.page.html',
    styleUrls: ['./dashboard-page.page.scss'],
})
export class DashboardPagePage implements OnInit {
    events = [];

    constructor(private modalController: ModalController, private storage: Storage,
                private menuController: MenuController, private router: Router) {
    }

    ngOnInit() {
        this.loadEvent();
    }

    ionViewWillEnter() {
        this.menuController.enable(true, 'admin-panel');
        this.menuController.enable(false, 'public-panel');
        this.menuController.enable(false, 'sub-panel');
    }

    async openModal() {
        const modal: HTMLIonModalElement =
            await this.modalController.create({
                component: AddEventModalComponent,
                // componentProps: {
                //     aParameter: true,
                //     otherParameter: new Date()
                // }
            });

        modal.onDidDismiss().then(val => {
            this.loadEvent();
        });
        //this is how you get the data passed by the modal
        // if (detail !== null) {
        //     console.log('The result:', detail.data);
        // }
        await modal.present();
    }

    async loadEvent() {
        await this.storage.get('events').then(val => {
            if (val != null) {
                this.events = val;
                this.events.reverse();
            }
        });
    }
}
