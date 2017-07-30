import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the Reportage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare const google;
let map;
let reportLoc;
let userLoc;

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  description: string = '';
  location: object = {};
  photo: object = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.initMap();
    console.log('ionViewDidLoad ReportPage');
  }

  initMap() {
    userLoc = {lat: -23.7024816, lng: 133.8781419}; //hard coded to alice springs for now

    map = new google.maps.Map(document.getElementById('reportmap'), {
      zoom: 14,
      center: userLoc
    });

    map.addListener('click', (event) => {
        this.addMarker(event.latLng);
    });

  }

  addMarker = function (loc){
    if (!reportLoc) {
      reportLoc = new google.maps.Marker({
        position: loc,
        map: map,
        draggable: true
      });
    } else {
      reportLoc.setPosition(loc);
    };
    this.location = loc;
  }

  submitForm = function () {
    console.log(this.location)
    let str="/import?lng="+this.location.lng()+
      "&lat="+this.location.lat()+
      "&date="+Date.now()+
      "&description="+this.description
    console.log(str);
    let loader = this.presentLoading()

    this.api.get(encodeURI(str)).then(data => {
      console.log(data)
      loader.dismiss();
      this.showAlertSuccess();
      this.description = null;
      this.location = null;
      //map.removeOverlay(reportLoc);
      //reportLoc.remove();

    }).catch(err => {
      console.error(JSON.stringify(err));
      loader.dismiss();
      this.showAlertFail();

    });
  };

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }

  showAlertSuccess() {
    let alert = this.alertCtrl.create({
      title: "Success!",
      subTitle: 'Your report has been submitted. Thankyou!',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlertFail() {
    let alert = this.alertCtrl.create({
      title: "Fail!",
      subTitle: 'There was an error submitting your report. Check your fields and try again.',
      buttons: ['OK']
    });
    alert.present();
  }

}


