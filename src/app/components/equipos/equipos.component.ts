import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../equipos/equipos.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
  providers : [EquiposService]
})
export class EquiposComponent implements OnInit {

  constructor(private _equiposService: EquiposService) { }

  equiposL = [];
  equipoSelected;

  init = ()=>{
    this._equiposService.getEquiposRest()
      .subscribe(
        res => {
          this.equiposL  = res.equipos;
        },
        err => {
          console.log(`Error al listar equipos ${err}`)
        }
      )
  };

  seleccionarEquipo = (id) =>{
    this._equiposService.getEquipo(id)
      .subscribe(
        res=>{
          this.equipoSelected = res.equipo;
        },
        error =>{
          console.log(`Error al seleccionar equipo`)
        })
  };

  ngOnInit() {
    this.init();
  }

}
