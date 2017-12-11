import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersService {

  constructor(private _http: Http) { }

  getUsersRest() {
    return this._http.get('http://localhost:3000/api/users')
      .map(res => res.json());
  }

  getUser(idUser) {
    return this._http.get('http://localhost:3000/api/users'+idUser)
      .map(res => res.json());
  }

  newUser(body) {
    return this._http.post('http://localhost:3000/api/user',body)
      .map(res => res.json());
  }

  deleteUser(idUser) {
    return this._http.delete('http://localhost:3000/api/user/delete/'+idUser)
      .map(res => res.json());
  }

  updateUser(idUser,body){
    return this._http.put('http://localhost:3000/api/user/update',body)
      .map(res => res.json());
  }



}
