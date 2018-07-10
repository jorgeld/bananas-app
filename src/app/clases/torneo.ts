import { Injectable } from '@angular/core';

@Injectable()
export class Torneo {

  campeon:object;
  subcampeon:object;
  resultado:string;

  constructor(campeon:object,subcampeon:object,resultado:string){
    // debugger;
    this.campeon = campeon;
    this.subcampeon = subcampeon;
    this.resultado = resultado
  }
}
