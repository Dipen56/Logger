import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminSettingPagePage } from './admin-setting-page.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSettingPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminSettingPagePage]
})
export class AdminSettingPagePageModule {}
