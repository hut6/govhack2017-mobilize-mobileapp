import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  saveEmail() {
    localStorage.setItem('email', this.email);

    let alert = this.alertCtrl.create({
      title: 'Saved',
      subTitle: 'Settings have been saved',
      buttons: ['OK']
    });
    alert.present();
  }

}
