import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Emergency} from "../../store/emergency";

@Injectable()
export class ApiProvider {
  root: string = 'https://2017-volunteers-govhack/api/v1';

  constructor(public http: Http) {
    console.log('Api Provider Loaded');
  }

  getEmergencies() {
    return this.get('/emergencies');
  }

  getNotifications() {
    // return this.get('/notifications/'+localStorage.getItem("email"));
    return this.get('/notifications/regan@hutsix.com.au');
  }

  markNotificationRead(id) {
    return this.get('/notifications/'+id+'/read/');
  }

  get(url) {
    return new Promise((accept) => {
      url = this.root + url;
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
