import { Component, OnInit } from '@angular/core';
import { EquiposService} from "../equipos/equipos.service";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-amistosos',
  templateUrl: './amistosos.component.html',
  styleUrls: ['./amistosos.component.css'],
  providers:[ EquiposService ]
})
export class AmistososComponent implements OnInit {

  constructor(private _equiposService: EquiposService) { }

  equipoList = [];
  equipoLocal;
  equipoVisitante;

  chartLocal = [];
  chartchartVisitante = [];

  medias = {
    local : {
      ataque : 0,
      defensa : 0,
      rebotes : 0,
      pase : 0,
      agresividad : 0,
      sexualidad : 0
    },
    visitante : {
      ataque : 0,
      defensa : 0,
      rebotes : 0,
      pase : 0,
      agresividad : 0,
      sexualidad : 0
    },
  };

  getEquiposList = () => {
    this._equiposService.getEquiposRest()
      .subscribe(
        res =>{
          this.equipoList = res.equipos;
        },
        error =>{}
      )
  };

  haciendoMedias = (equipo,local) => {

    let sumatorio = {
      ataque : 0,
      defensa : 0,
      rebotes : 0,
      pase : 0,
      agresividad : 0,
      sexualidad : 0
    };

    equipo.jugadores.forEach( (jugador) => {
        sumatorio.ataque += jugador.atributos.ataque;
        sumatorio.defensa += jugador.atributos.defensa;
        sumatorio.rebotes += jugador.atributos.rebotes;
        sumatorio.pase += jugador.atributos.pase;
        sumatorio.agresividad += jugador.atributos.agresividad;
        sumatorio.sexualidad += jugador.atributos.sexualidad;
      } );

      if(local){
        this.medias.local.ataque = sumatorio.ataque / 10;
        this.medias.local.defensa = sumatorio.defensa / 10;
        this.medias.local.rebotes = sumatorio.rebotes / 10;
        this.medias.local.pase = sumatorio.pase / 10;
        this.medias.local.agresividad = sumatorio.agresividad / 10;
        this.medias.local.sexualidad = sumatorio.sexualidad / 10;
      }else{
        this.medias.visitante.ataque = sumatorio.ataque / 10;
        this.medias.visitante.defensa = sumatorio.defensa / 10;
        this.medias.visitante.rebotes = sumatorio.rebotes / 10;
        this.medias.visitante.pase = sumatorio.pase / 10;
        this.medias.visitante.agresividad = sumatorio.agresividad / 10;
        this.medias.visitante.sexualidad = sumatorio.sexualidad / 10;
      }

      this.chartLocal = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: ['ATQ','DEF','REB','PAS','AGR', 'SEX'],
          datasets: [
            {
              data: [this.medias.local.ataque,this.medias.local.defensa,this.medias.local.rebotes,this.medias.local.pase,this.medias.local.agresividad,this.medias.local.sexualidad],
              borderColor: "#3cba9f",
              fill: false
            },
            {
              data: [this.medias.visitante.ataque,this.medias.visitante.defensa,this.medias.visitante.rebotes,this.medias.visitante.pase,this.medias.visitante.agresividad,this.medias.visitante.sexualidad],
              borderColor: "#3cba9f",
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      });



  };

  ngOnInit() {
    this.getEquiposList();
  }

}
