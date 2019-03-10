import { Component, OnInit } from '@angular/core';
import { PopoverController} from '@ionic/angular';
import {ChangePasswordPopoverComponent} from '../change-password-popover/change-password-popover.component';
import {SetTitlePopoverComponent} from '../set-title-popover/set-title-popover.component';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.page.html',
    styleUrls: ['./settings-page.page.scss'],
})
export class SettingsPagePage implements OnInit {

    constructor(private popoverController: PopoverController) { }

    ngOnInit() {
    }
    async presentChangePasswordPopover(ev: Event) {
        const popover = await this.popoverController.create({
            component: ChangePasswordPopoverComponent,
            event: ev,
            translucent: true,
            componentProps: {
                popover: popover
            }
        });
        await popover.present();
    }
    async presentTitlePopover(ev: Event){
        const popover = await this.popoverController.create({
            component: SetTitlePopoverComponent,
            event: ev,
            translucent: true,
            componentProps: {
                popover: popover
            }
        });
        await popover.present();
    }
}
