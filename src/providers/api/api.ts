import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Emergency} from "../../store/emergency";

@Injectable()
export class ApiProvider {
  root: string = 'https://mobilize.team/api/v1';

  constructor(public http: Http) {
    console.log('Api Provider Loaded');
  }

  getEmergencies() {
    return this.get('/emergencies');
    /* return the promise and let the endpoint handle errors
    this.get('/emergencies').then(data => {
      return data;
    }).catch(err => {
      console.error(JSON.stringify(err))
      return [];
    });
    */
  }

  get(url) {
    return new Promise((accept) => {
      this.http.get(this.root + url)
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
