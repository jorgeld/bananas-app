import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataService{

  private cm =  new BehaviorSubject<object>({});
  public _cm = this.cm.asObservable();

  constructor() {}

  cambiandoMensaje(param:object){
    console.log('pasando objeto --_> ' , param)
    this.cm.next(param);
  }

}
