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

  newEquipo(body) {
    return this._http.post('http://localhost:3000/api/equipo',body)
      .map(res => res.json());
  }

  updateEquipo(equipoId,body){
    debugger;
    return this._http.put('http://localhost:3000/api/equipo/update/'+equipoId,body)
      .map(res => res.json());
  }

  deleteEquipo(idEquipo) {
    return this._http.delete('http://localhost:3000/api/equipo/delete/'+idEquipo)
      .map(res => res.json());
  }

  generarDraft(body) {
    return this._http.post('http://localhost:3000/api/equipos/guardarDraft',body)
      .map(res => res.json());
  }

  deleteAllEquipos() {
    return this._http.delete('http://localhost:3000/api/deleteAllEquipos')
      .map(res => res.json());
  }

  generateAllTeams(){
    return this._http.get('http://localhost:3000/api/generarEquipos')
      .map(res => res.json());
  }


}
