import {Injectable} from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataService{

  private messageSource = new BehaviorSubject('default message');

  currentMessage = this.messageSource.asObservable();

  private cm =  new Subject<string>();
  public _cm = this.cm.asObservable();

  constructor() {}

  changeMessage(message: string) {
    this.messageSource.next(message);
    console.log('Recibiendo llamada en fichero servicios 2 ---> ' , message);
    console.log('Nuevo valor 2 ---> ' , this.currentMessage);
    this.cm.next(message)
  }

}
