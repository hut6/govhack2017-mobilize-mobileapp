import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ApiProvider} from "../api/api";

@Injectable()
export class PushProvider {

  constructor(public http: Http, public api: ApiProvider) {
    console.log('Hello PushProvider Provider');
  }

  getPush() {
    this.api.get('');
  }

}
