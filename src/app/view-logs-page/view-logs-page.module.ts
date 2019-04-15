import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewLogsPagePage } from './view-logs-page.page';
import { LogDetailPageComponent } from './log-detail-page/log-detail-page.component';
import { ViewLogsPopoverComponent } from './view-logs-popover/view-logs-popover.component';

const routes: Routes = [
  {
    path: '',
    component: ViewLogsPagePage
  },
    {
      path: ':id',
        component: LogDetailPageComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewLogsPagePage, LogDetailPageComponent, ViewLogsPopoverComponent]
})
export class ViewLogsPagePageModule {}
