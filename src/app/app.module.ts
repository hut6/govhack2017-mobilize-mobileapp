import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MapPage} from "../pages/map/map";
import {ReportPage} from "../pages/report/report";
import {ProfilePage} from "../pages/profile/profile";
import { ApiProvider } from '../providers/api/api';
import { PushProvider } from '../providers/push/push';
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    ProfilePage,
    ReportPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    ReportPage,
    ProfilePage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    PushProvider
  ]
})
export class AppModule {}
