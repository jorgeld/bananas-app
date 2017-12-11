import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MonkeysService {

  constructor(private _http: Http) { }

  getMonkeysRest() {
    return this._http.get('http://localhost:3000/api/monkeys')
      .map(res => res.json());
  }

  getMonkey(idMonkey) {
    return this._http.get('http://localhost:3000/api/monkey'+idMonkey)
      .map(res => res.json());
  }

  newMonkey(body) {
    return this._http.post('http://localhost:3000/api/monkey',body)
      .map(res => res.json());
  }

  deleteMonkey(idMonkey) {
    return this._http.delete('http://localhost:3000/api/monkey/delete/'+idMonkey)
      .map(res => res.json());
  }

  updateMonkey(idMonkey,body){
    return this._http.put('http://localhost:3000/api/monkey/update',body)
      .map(res => res.json());
  }

  giveBanana(idMonkey){
    return this._http.get('http://localhost:3000/api/monkey/banana/'+idMonkey)
      .map(res => res.json());
  }



}
