import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController} from "ionic-angular";

@Injectable()
export class ApiProvider {
  root: string = 'https://mobilize.team/api/v1';

  constructor(public http: Http, public alertCtrl: AlertController) {
    console.log('Api Provider Loaded');
  }

  getEmergencies() {
    return this.get('/emergencies');
  }

  getNotifications() {
    return this.get('/notifications/'+localStorage.getItem("email"));
  }

  markNotificationRead(id) {
    return this.get('/notifications/'+id.toString()+'/read');
  }

  markNotificationAccept(id) {
    let alert = this.alertCtrl.create({
      title: 'Thank You',
      buttons: ['OK']
    });
    alert.present();

    return this.get('/notifications/'+id.toString()+'/accept');
  }

  markNotificationReject(id) {
    return this.get('/notifications/'+id.toString()+'/reject');
  }

  get(url) {
    return new Promise((accept) => {
      url = this.root + url;
      console.log(url);
      this.http.get(url.toString())
        .map(res => res.json())
        .subscribe(data => {
          accept(data)
        })
    });
  }

  post(url, body, options) {
    return new Promise((accept) => {
      this.http.post(url, body, options)
        .map(res => res.json())
        .subscribe(data => {
          accept(data)
        })
    });
  }
}
