import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
//import { CallNumber } from '@ionic-native/call-number';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PopoverComponent } from './popover/popover.component';
import { ChangePasswordPopoverComponent } from './change-password-popover/change-password-popover.component';
import { FormsModule } from '@angular/forms';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ViewLogsPopoverComponent} from './view-logs-page/view-logs-popover/view-logs-popover.component';
import {ViewLogsPagePageModule} from './view-logs-page/view-logs-page.module';
import {ViewLogsPagePage} from './view-logs-page/view-logs-page.page';
import {SignupGuard} from './signup-page/signup.guard';
import {AddEventModalComponent} from './dashboard-page/add-event-modal/add-event-modal.component';
import {DashboardPagePageModule} from './dashboard-page/dashboard-page.module';

@NgModule({

    declarations: [AppComponent, PopoverComponent, ChangePasswordPopoverComponent,  AddEventModalComponent],
    entryComponents: [PopoverComponent, ChangePasswordPopoverComponent,  ViewLogsPopoverComponent, AddEventModalComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot(),
        FormsModule,
        ViewLogsPagePageModule,
        DashboardPagePageModule

    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        SocialSharing,
        FileChooser,
        FilePath,
        File,
        AndroidPermissions,
        ViewLogsPagePage,
        SignupGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
