import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'log-info-page',
        pathMatch: 'full'
    },
    { path: 'log-info-page', loadChildren: './log-info-page/log-info-page.module#LogInfoPagePageModule' },
    { path: 'view-logs-page', loadChildren: './view-logs-page/view-logs-page.module#ViewLogsPagePageModule' },
    { path: 'settings-page', loadChildren: './settings-page/settings-page.module#SettingsPagePageModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
