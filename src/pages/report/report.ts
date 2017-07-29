import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Reportage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare const google;
let map;

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  reportLoc: any;
  userLoc: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let reportLoc = [];
    let userLoc;
  }

  ionViewDidLoad() {
    this.initMap();
    console.log('ionViewDidLoad ReportPage');
  }

  initMap() {
    this.userLoc = {lat: -23.7024816, lng: 133.8781419}; //hard coded to alice springs for now

    map = new google.maps.Map(document.getElementById('reportmap'), {
      zoom: 14,
      center: this.userLoc
    });

    map.addListener('click', function(event) {

      this.reportLoc = new google.maps.Marker({
        position: event.latLng,
        map: map
      });

    });

  }


}




