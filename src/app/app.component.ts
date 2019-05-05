import {Component} from '@angular/core';

import {ModalController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    // these are the pages that gets loaded in teh menu
    public adminPanel = [
        {
            title: 'Dashboard',
            url: '/dashboard-page'
        },
        {
            title: 'Setting',
            url: '/admin-setting-page'
        },
        {
            title: 'Sign Out',
            url: '/login-page',
        }
    ];
    public subPanel = [
        {
            title: 'Dashboard',
            url: '/dashboard-page'
        },
        {
            title: 'Sign Out',
            url: '/login-page',
        }
    ];

    public publicPanel = [
        {
            title: 'Admin Panel',
            url: '/login-page'
        },
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public modalController: ModalController,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByHexString('#5C3C4C');
            this.splashScreen.hide();
        });
    }
}
