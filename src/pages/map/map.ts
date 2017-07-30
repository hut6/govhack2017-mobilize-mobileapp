import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import {ApiProvider} from "../../providers/api/api";


/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare const google;
let map;
const userLoc = {lat: -23.7024816, lng: 133.8781419}; //hard coded to alice springs for now

let markers = [];
let icons;

const iconBase = 'https://mobilize.team/m/assets/map-icons/';
const mapIcon = {
  //pfes icons (could be others)
  'Smoke Complaint/Illegal Burn': 'fire',
  'Automatic Fire Alarm': 'alarm',
  'Grass and Scrub Fire': 'bushfire',
  'Structure Fire': 'housefire',
  'Vehicle Fire': 'carfire',
  'Non Structure Fire': 'bushfire',
  'Road Crash': 'carcrash',
  //mobilizer icons
  'House Fire': 'housefire',
  'Bush Fire': 'bushfire',
  'Burn Off': 'controlled',
  'Car Crash': 'carcrash',
  'Medical Emergency': 'health',
  'Search & Rescue': 'search',
  'Amber Alert': 'amber'
};

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public api: ApiProvider) {}

  ionViewDidLoad() {
    this.initMap();
    this.addWebData();
    this.addData();
    console.log('ionViewDidLoad MapPage');
  }

  initMap() {

    icons = this.getIcons();

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: userLoc
    });

    let userMarker = {
      m: new google.maps.Marker({
        position: userLoc,
        map: map,
        title: "current location",
      })
    };

  }

  addData (){
    this.api.getEmergencies().then(data => {

      for (let i in data){

        let incident=data[i];

        let loc = { lat: Number(incident.lat), lng: Number(incident.lon) };
        let dist = getDist(loc, userLoc).toFixed(2);

        markers.push ({
          m: new google.maps.Marker({
            position: loc,
            map: map,
            icon: icons[mapIcon[incident.type]].icon,
            title: incident.eventtype,
          }),
          i: new google.maps.InfoWindow({
            content: "" +
            "<div class='info'>" +
            "<h5>"+incident.type+"</h5>" +
            "<p>"+new Date(incident.created.date)+"</p>" +
            //"<p>"+incident.location +
            "<strong>("+dist+" km)</strong></p>" +
            "<p>"+incident.description+"</p>" +
            //"<p>"+incident.skills+"</p>" +
            "</div>"
          })
        });
      }

      this.addListeners()

    }).catch(err => {

      console.error(JSON.stringify(err));

    });
  }

  addWebData(){
    this.http.get('http://www.pfes.nt.gov.au/incidentmap/json/ntfrsincidents.json').map(res => res.json()).subscribe(data => {
      data.incidents.forEach(function (incident){

        //if (incident.status == 'closed') return;

        let loc = {lat: Number(incident.coordinate.split(',')[0]), lng: Number(incident.coordinate.split(',')[1]) };
        let dist = getDist(loc, userLoc).toFixed(2);

        markers.push ({
          m: new google.maps.Marker({
            position: loc,
            map: map,
            icon: icons[mapIcon[incident.eventtype]].icon,
            title: incident.eventtype,
          }),
          i: new google.maps.InfoWindow({
            content: "" +
            "<div class='info'>" +
            "<h5>"+incident.eventtype+" ("+incident.category+")</h5>" +
            "<p>"+new Date(incident.datenotified)+"</p>" +
            "<p>"+incident.location +
            "<strong>("+dist+" km)</strong></p>" +
            "<p>"+incident.eventtype+"</p>" +
            //"<p>"+incident.status+"</p>" +
            "</div>"
          })
        });

      });

      this.addListeners()

    });
  }

  addListeners(){
    markers.forEach(function (marker) {
      marker.m.addListener('click', function () {
        marker.i.open(map, marker.m);
      });
    })
  };



  getIcons(){
    return {
      current: {
        icon: {
          url: iconBase + 'carcrash.png',
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40)
        }
      },alarm: {
        icon: {
          url: iconBase + 'alarm.png',
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40)
        }
      },alert: {
        icon: {
          url: iconBase + 'alert.png',
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40)
        }
      },amber: {
        icon: {
          url: iconBase + 'amber.png',
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40)
        }
      },bushfire: {
        icon: {
          url: iconBase + 'bushfire.png',
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40)
        }
      },carcrash: {
        icon: {
          url: iconBase + 'carcrash.png',
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40)
        }
      },controlled: {
        icon: {
          url: iconBase + 'controlled.png',
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40)
        }
      },health: {
        icon: {
          url: iconBase + 'health.png',
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40)
        }
      },housefire: {
        icon: {
          url: iconBase + 'housefire.png',
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40)
        }
      },search: {
        icon: {
          url: iconBase + 'search.png',
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40)
        }
      },carfire: {
        icon: {
          url: iconBase + 'carfire.png',
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40)
        }
      },fire: {
        icon: {
          url: iconBase + 'fire.png',
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(40, 40)
        }
      },
    };
  }

}


let getDist = function (loc1,loc2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(loc2.lat-loc1.lat);  // deg2rad below
  var dLon = deg2rad(loc2.lng-loc2.lng);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(loc1.lat)) * Math.cos(deg2rad(loc2.lat)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
};

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
