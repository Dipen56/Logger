import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignupGuard} from './signup-page/signup.guard';

const routes: Routes = [
    {path: '', redirectTo: 'signup-page', pathMatch: 'full'},
    {path: 'log-info-page', loadChildren: './log-info-page/log-info-page.module#LogInfoPagePageModule'},
    {path: 'view-logs-page', loadChildren: './view-logs-page/view-logs-page.module#ViewLogsPagePageModule'},
    {path: 'settings-page', loadChildren: './settings-page/settings-page.module#SettingsPagePageModule'},
    {path: 'login-page', loadChildren: './login-page/login-page.module#LoginPagePageModule'},
    {path: 'signup-page', loadChildren: './signup-page/signup-page.module#SignupPagePageModule', canActivate: [SignupGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
