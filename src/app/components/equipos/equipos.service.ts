import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EquiposService {

  constructor(private _http: Http) { }

  getEquiposRest() {
    return this._http.get('http://localhost:3000/api/equipos')
      .map(res => res.json());
  }

  getEquipo(idEquipo){
    return this._http.get('http://localhost:3000/api/equipo/'+idEquipo)
      .map(res => res.json())
  }
}
