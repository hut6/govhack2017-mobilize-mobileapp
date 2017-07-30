import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {MapPage} from "../map/map";
import {ReportPage} from "../report/report";
import {PushProvider} from "../../providers/push/push";
import {AlertController} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = ReportPage;
  // tab4Root = ProfilePage;

  constructor(public push: PushProvider, public alertCtrl: AlertController) {
    localStorage.clear();

    if(localStorage.getItem('email')) {
      this.startNotifications();
    } else {
      let prompt = this.alertCtrl.create({
        title: 'Login',
        message: "Enter a email that's linked to your account",
        inputs: [
          {
            name: 'email',
            type: 'email',
            placeholder: 'Email Address'
          },
        ],
        buttons: [
          {
            text: 'Save',
            handler: data => {
              localStorage.setItem('email', data.email);
              this.startNotifications();
            }
          }
        ]
      });
      prompt.present();
    }
  }

  startNotifications() {
    setInterval(()=>{
      this.push.getPush();
    }, 10000);
  }
}
