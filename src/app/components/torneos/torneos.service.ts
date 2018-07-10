import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TorneosService {

  constructor(private _http: Http) { }

  getTorneosLis(){
    return this._http.get('http://localhost:3000/api/torneos')
      .map(res => res.json());
  }

  newTorneo(body){
    return this._http.post('http://localhost:3000/api/torneo', body)
      .map(res => res.json());
  }

  deleteAlltorneos(){
    return this._http.delete('http://localhost:3000/api/deleteAllTorneos')
      .map(res => res.json())
  }



}
