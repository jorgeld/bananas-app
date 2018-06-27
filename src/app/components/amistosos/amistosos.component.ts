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


  RATIOS = {
    RATIO_ATQ : 200,
    RATIO_DEF : 50,
    RATIO_REB : 25,
    RATIO_PAS : 25,
    RATIO_AGR : 25,
    RATIO_SEX : 25,
  };

  DIFERENCIAL = 30;


  chartLocal = [];

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

  jugarPartido = () => {

    this.equipoLocal.medias = this.medias.local;
    this.equipoVisitante.medias = this.medias.visitante;

    let RATIO_ATQ = 200;
    let RATIO_DEF = 50;

    let DIFERENCIAL = 30;


    // let puntosLocal = (RATIO_ATQ * this.equipoLocal.medias.ataque) /  100;
    let puntosLocal = this.generarPuntuaciones('local','ATQ');
    let defensa_local = this.generarPuntuaciones('local','DEF');



    let puntosVisitante = this.generarPuntuaciones('visitante','ATQ');
    let defensa_visitante = this.generarPuntuaciones('visitante','DEF');

    console.log('puntos local --->' , Math.floor((Math.random() * (puntosLocal - (puntosLocal-DIFERENCIAL))+puntosLocal-DIFERENCIAL))  -  Math.floor((Math.random() * (defensa_visitante - (defensa_visitante-DIFERENCIAL))+defensa_visitante-DIFERENCIAL)) );
    console.log('puntos visit --->' , Math.floor((Math.random() * (puntosVisitante - (puntosVisitante-DIFERENCIAL))+puntosVisitante-DIFERENCIAL))  -  Math.floor((Math.random() * (defensa_local - (defensa_local-DIFERENCIAL))+defensa_local-DIFERENCIAL)) );

  };



  generarPuntuaciones = (equipo,atributo) => {

    let response;

    if(equipo === 'local'){
      switch (atributo){
        case 'ATQ' : response = ((this.RATIOS.RATIO_ATQ * this.equipoLocal.medias.ataque) /  100);break;
        case 'DEF' : response = ((this.RATIOS.RATIO_DEF * this.equipoLocal.medias.defensa) /  100);break;
        case 'REB' : response = ((this.RATIOS.RATIO_REB * this.equipoLocal.medias.rebotes) /  100);break;
        case 'PAS' : response = ((this.RATIOS.RATIO_PAS * this.equipoLocal.medias.pase) /  100);break;
        case 'AGR' : response = ((this.RATIOS.RATIO_AGR * this.equipoLocal.medias.agresividad) /  100);break;
        case 'SEX' : response = ((this.RATIOS.RATIO_SEX * this.equipoLocal.medias.sexualidad) /  100);break;
      }
    }else{
      switch (atributo){
        case 'ATQ' : response = ((this.RATIOS.RATIO_ATQ * this.equipoVisitante.medias.ataque) /  100);break;
        case 'DEF' : response = ((this.RATIOS.RATIO_DEF * this.equipoVisitante.medias.defensa) /  100);break;
        case 'REB' : response = ((this.RATIOS.RATIO_REB * this.equipoVisitante.medias.rebotes) /  100);break;
        case 'PAS' : response = ((this.RATIOS.RATIO_PAS * this.equipoVisitante.medias.pase) /  100);break;
        case 'AGR' : response = ((this.RATIOS.RATIO_AGR * this.equipoVisitante.medias.agresividad) /  100);break;
        case 'SEX' : response = ((this.RATIOS.RATIO_SEX * this.equipoVisitante.medias.sexualidad) /  100);break;
      }
    }
    return response;
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
              backgroundColor:"#3cba9f",
              fill: false
            },
            {
              data: [this.medias.visitante.ataque,this.medias.visitante.defensa,this.medias.visitante.rebotes,this.medias.visitante.pase,this.medias.visitante.agresividad,this.medias.visitante.sexualidad],
              borderColor: "#ecca1e",
              backgroundColor:"#ecca1e",
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          barPercentage: 1.0,
          categoryPercentage:1.0,
          scales: {
            xAxes: [{
              barPercentage: 1,
              categoryPercentage: 0.7,
              gridLines : {
                offsetGridLines : false
              },
              display: true,
              stacked: false
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fixedStepSize: 5,
                max: 100,
                min: 0
              },
              display: true,
              stacked: false
            }],
          }
        }
      });



  };

  ngOnInit() {
    this.getEquiposList();
  }

}
