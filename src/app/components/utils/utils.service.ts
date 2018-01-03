import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

@Injectable()
export class UtilsService {

  constructor(private _http: Http) { }

  getPaises() {
    return this._http.get('http://localhost:3000/api/utilidades/paises')
      .map(res => res.json());
  }

  getComunidades() {
    return this._http.get('http://localhost:3000/api/utilidades/comunidades')
      .map(res => res.json());
  }

  getProvincias() {
    return this._http.get('http://localhost:3000/api/utilidades/provincias')
      .map(res => res.json());
  }

  getApellidos() {
    return this._http.get('http://localhost:3000/api/utilidades/apellidos')
      .map(res => res.json());
  }

  getNombres() {
    return this._http.get('http://localhost:3000/api/utilidades/nombres')
      .map(res => res.json());
  }

  getNombresHombre() {
    return this._http.get('http://localhost:3000/api/utilidades/nombrehombres')
      .map(res => res.json());
  }

  getnombresMujer() {
    return this._http.get('http://localhost:3000/api/utilidades/nombresmujeres')
      .map(res => res.json());
  }

}
