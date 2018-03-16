import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class JugadoresService {

  constructor(private _http: Http) { }

  getJugadoresRest() {
    return this._http.get('http://localhost:3000/api/jugadores')
      .map(res => res.json());
  }

  getJugador(idJugador) {
    return this._http.get('http://localhost:3000/api/jugador/'+idJugador)
      .map(res => res.json());
  }

  newJugador(body) {
    return this._http.post('http://localhost:3000/api/jugador',body)
      .map(res => res.json());
  }

  deleteJugador(idJugador) {
    return this._http.delete('http://localhost:3000/api/jugador/delete/'+idJugador)
      .map(res => res.json());
  }

  updateJugador(idjugador,body){
    return this._http.put('http://localhost:3000/api/jugador/update/'+idjugador,body)
      .map(res => res.json());
  }

  hornearJugadores(body) {
    return this._http.post('http://localhost:3000/api/hornadajugadores', body)
      .map(res => res.json());
  }

}


