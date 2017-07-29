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

    // default to alice springs, get actual data
    let location = {lat: -23.7024816, lng: 133.8781419};

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: location
    });
    markers.push ({
        m: new google.maps.Marker({
            position: {lat: -23.7022816, lng: 133.8780419},
            map: map,
            //icon: icons['info'].icon,
            title: "test",
            //animation: google.maps.Animation.DROP,
            label: "L"
          }),
        i: new google.maps.InfoWindow({
            content: "<div class='info'>" +
            "<h1>Incident Title</h1>" +
            "<h2>Distance</h2>" +
            "<p>Words words words</p>" +
            "</div>"
        })
    });

    markers.forEach(function (marker){
        let info=marker.i;
        marker.m.addListener('click', function() {
            marker.i.open(map, marker.m);
        });
    })

  }




}
