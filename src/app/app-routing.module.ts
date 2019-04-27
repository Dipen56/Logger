import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignupGuard} from './signup-page/signup.guard';
import {LogDetailPageComponent} from './view-logs-page/log-detail-page/log-detail-page.component';

const routes: Routes = [
    {path: '', redirectTo: 'signup-page', pathMatch: 'full'},
    {path: 'log-info-page/:id', loadChildren: './log-info-page/log-info-page.module#LogInfoPagePageModule'},
    {path: 'view-logs-page/:id', loadChildren: './view-logs-page/view-logs-page.module#ViewLogsPagePageModule'},
    {path: 'settings-page', loadChildren: './settings-page/settings-page.module#SettingsPagePageModule'},
    {path: 'login-page', loadChildren: './login-page/login-page.module#LoginPagePageModule'},
   // {path: 'signup-page', loadChildren: './signup-page/signup-page.module#SignupPagePageModule', canActivate: [SignupGuard]},
    {path: 'signup-page', loadChildren: './signup-page/signup-page.module#SignupPagePageModule'},
    {path: 'dashboard-page', loadChildren: './dashboard-page/dashboard-page.module#DashboardPagePageModule'},
];

// loadchildern will load the components module and then it will look in there for its children
// load component will only load that page.
@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
