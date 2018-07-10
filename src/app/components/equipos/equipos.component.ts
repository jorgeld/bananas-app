import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../equipos/equipos.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
  providers : [EquiposService]
})
export class EquiposComponent implements OnInit {

  constructor(private _equiposService: EquiposService) {



  }

  equiposL = [];
  equipoSelected;

  medias = {
    ataque : 0,
    defensa : 0,
    rebotes : 0,
    pase : 0,
    agresividad : 0,
    sexualidad : 0
  };

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
          let trofeos = [];
          for(let t = 0; t < this.equipoSelected.palmares; t++){
            trofeos.push(1);
          }
          this.equipoSelected.palmares = trofeos;
          this.calculoMedias();
        },
        error =>{
          console.log(`Error al seleccionar equipo`)
        })
  };

 // TODO: refactorizar este método
  calculoMedias = () => {

    let sumatorio = {
      ataque : 0,
      defensa : 0,
      rebotes : 0,
      pase : 0,
      agresividad : 0,
      sexualidad : 0
    };

    if(this.equipoSelected && this.equipoSelected.jugadores.length > 0){
      this.equipoSelected.jugadores.forEach( (jugador) => {
        sumatorio.ataque += jugador.atributos.ataque;
        sumatorio.defensa += jugador.atributos.defensa;
        sumatorio.rebotes += jugador.atributos.rebotes;
        sumatorio.pase += jugador.atributos.pase;
        sumatorio.agresividad += jugador.atributos.agresividad;
        sumatorio.sexualidad += jugador.atributos.sexualidad;
      } );

      this.medias.ataque = sumatorio.ataque / 10;
      this.medias.defensa = sumatorio.defensa / 10;
      this.medias.rebotes = sumatorio.rebotes / 10;
      this.medias.pase = sumatorio.pase / 10;
      this.medias.agresividad = sumatorio.agresividad / 10;
      this.medias.sexualidad = sumatorio.sexualidad / 10;

    }else{
      console.log(`No hay equipo seleccionado o equipo no tiene jugadores`)
    }
  };

  ngOnInit() {
    this.init();
  }

}
