import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AuthInterceptor} from '@core/helpers/auth-interceptor';

import {AppComponent} from './app.component';
import {UnderconstructionPage} from '@core/ui/pages/underconstruction/underconstruction.page';


@NgModule({
    declarations: [
        AppComponent,
        UnderconstructionPage
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        HttpClient,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
