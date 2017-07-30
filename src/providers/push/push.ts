import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ApiProvider} from "../api/api";

@Injectable()
export class PushProvider {

  constructor(public http: Http, public api: ApiProvider) {
    console.log('Loaded Push Provider');
  }

  getPush() {
    this.api.getNotifications().then(data => {
      // data.forEach((notification) => {
      //   console.log(notification);
      // });
    });

  }

}
