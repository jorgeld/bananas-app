import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataService{

  private cm =  new BehaviorSubject<string>('Example');
  public _cm = this.cm.asObservable();

  constructor() {}

  cambiandoMensaje(param:any){
    this.cm.next(param);
  }

}
