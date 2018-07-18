import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit {

  constructor() { }

  enviandoResultadoPartido = (param) => {
    console.log('Recibiendo datos en Clasificacion---> ' , param);
  };

  PRUEBA = 0;

  // recibiendoDatosPartido = (param) => {
  //   console.log('Recibiendo en liga --> ' , param);
  //   this.PRUEBA = param
  // };

  ngOnInit() {
  }

}
