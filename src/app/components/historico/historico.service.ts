import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class HistoricoService {

  constructor(private _http: Http) { }

  getHistoricoTorneos() {
    return this._http.get('http://localhost:3000/api/torneos')
      .map(res => res.json());
  }

}
