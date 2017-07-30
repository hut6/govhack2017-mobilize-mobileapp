import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {MapPage} from "../map/map";
import {ReportPage} from "../report/report";
import {ProfilePage} from "../profile/profile";
import {PushProvider} from "../../providers/push/push";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = ReportPage;
  tab4Root = ProfilePage;

  constructor(public push: PushProvider) {
    setInterval(()=>{
      this.push.getPush();
    }, 10000);
  }
}
