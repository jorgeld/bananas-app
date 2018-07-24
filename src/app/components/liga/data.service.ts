import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataService{

  private cm =  new BehaviorSubject<string>('Example');
  public _cm = this.cm.asObservable();

  constructor() {}

  cambiandoMensaje(param){
    console.log('Valor parametro' , param);
    this.cm.next(param);
    console.log('Nuevo valor cm ---> ' , this.cm);
  }

}
