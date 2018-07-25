import {Component, Input, OnInit} from '@angular/core';
import { DataService } from "../data.service";
import {Subscription} from "rxjs/Subscription";
import { EquiposService} from '../../equipos/equipos.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css'],
  providers:[EquiposService]
})
export class ClasificacionComponent implements OnInit {

  constructor(
    private data: DataService,
    private _equiposService: EquiposService
  ) {}

  clasificacion = [];
  resultado:object;


  actualizarClasificacion(){
    this.clasificacion.forEach((equipo,index) => {
      if(equipo._id === this.resultado['ganador'].equipo._id){
       equipo.est.ganados++;
       equipo.est.jugados++;
       equipo.est.pf = equipo.est.pf + this.resultado['ganador'].puntosFavor;
       equipo.est.pc = equipo.est.pc + this.resultado['ganador'].puntosContra;
      }
      if(equipo._id === this.resultado['perdedor'].equipo._id){
        equipo.est.perdidos++;
        equipo.est.jugados++;
        equipo.est.pf = equipo.est.pf + this.resultado['perdedor'].puntosFavor;
        equipo.est.pc = equipo.est.pc + this.resultado['perdedor'].puntosContra;
      }
    });
    this.ordenarClasificacion();
  }

  ordenarClasificacion(){
    this.clasificacion.sort(function(a,b){
      if (a.est.ganados < b.est.ganados) {
        return 1;
      }
      if (a.est.ganados  > b.est.ganados) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
  }


  ngOnInit() {

    this.data._cm
      .subscribe(
        res => {
          this.resultado = res;
          this.actualizarClasificacion();
        },
        err => console.log(err),
        () => console.log('completo')
      );

    this._equiposService.getEquiposRest()
      .subscribe(
        (equiposL) => {
          this.clasificacion = equiposL.equipos;
          this.clasificacion.map((equipo)=> {
            equipo.est = {jugados:0,ganados:0,perdidos:0,pf:0,pc:0}
          })
        },
        (error) => { alert('Error al recuperar listado de equipos') }
      )

  }

}
