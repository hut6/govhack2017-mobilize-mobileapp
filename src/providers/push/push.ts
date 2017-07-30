import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ApiProvider} from "../api/api";
import {AlertController} from "ionic-angular";
import {Notification} from "../../store/notifications";

@Injectable()
export class PushProvider {
  title: string;
  message: string;
  buttons: any;

  constructor(public http: Http, public api: ApiProvider, public alertCtrl: AlertController) {
    console.log('Loaded Push Provider');
  }

  getPush() {
    this.api.getNotifications().then((notifications: Notification[]) => {
      notifications.forEach((notification: Notification) => {
        this.title = 'New Message';
        this.message = '';
        this.buttons = ['Ok'];

        if(notification.category == 'new_enrollment') {
          this.title = 'Incident';
          this.message = notification.enrollment.emergency.description;
          this.buttons = [
            {
              text: 'Reject',
              handler: data => {
                console.log('Reject clicked');
              }
            },
            {
              text: 'Accept',
              handler: data => {
                console.log('Accept clicked');
              }
            }
          ];
        }

        if(notification.category == 'cancel') {
          this.title = 'Canceled';
          this.message = 'The recent incident request has been canceled';
        }

        if(notification.category == 'confirm') {
          this.title = 'Confirmed';
          this.message = 'Your recent incident reply has been accepted';
        }

        let prompt = this.alertCtrl.create({
          title: this.title,
          message: this.message,
          buttons: this.buttons
        });
        prompt.present();
        console.log(notification.id);
        this.api.markNotificationRead(notification.id);
      })
    });
  }

}
