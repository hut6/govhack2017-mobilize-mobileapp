import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";


/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google;
let markers = [];

let iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

let icons = {
  parking: {
    icon: iconBase + 'parking_lot_maps.png'
  },
  library: {
    icon: iconBase + 'library_maps.png'
  },
  info: {
    icon: iconBase + 'info-i_maps.png'
  }
};



@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider) {}

  ionViewDidLoad() {
    this.initMap();
    console.log('ionViewDidLoad MapPage');
  }

  initMap() {
    console.log("init")
    let uluru = {lat: -19.1340996, lng: 133.7194545};
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: uluru
    });

    markers.push (
      new google.maps.Marker({
        position: uluru,
        map: map,
        icon: icons['info'].icon
      })
    );

  }




}
