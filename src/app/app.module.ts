import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
//import { CallNumber } from '@ionic-native/call-number';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PopoverComponent } from './popover/popover.component';
import { ChangePasswordPopoverComponent } from './change-password-popover/change-password-popover.component';
import { FormsModule } from '@angular/forms';

@NgModule({

    declarations: [AppComponent, PopoverComponent, ChangePasswordPopoverComponent],
    entryComponents: [PopoverComponent, ChangePasswordPopoverComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot(),
        FormsModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        // CallNumber
        SocialSharing,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
