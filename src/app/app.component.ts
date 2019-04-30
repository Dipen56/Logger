import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    // these are the pages that gets loaded in teh menu
    public appPages = [
        {
            title: 'Subscribe',
            url: '/log-info-page'
        },
        {
            title: 'View Logs',
            url: '/view-logs-page'
        },
        {
            title: 'Settings',
            url: '/settings-page',
            icon: 'settings'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storage: Storage
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            // this.storage.get('showTitle').then((val) => {
            //     if (val == null) {
            //         this.storage.set('showTitle', true);
            //     }
            // });
            // this.storage.set('showLogo', true);
            // // this.storage.set('logViewAuth', false);
        });
    }
}
