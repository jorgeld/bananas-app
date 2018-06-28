import { Component, OnInit } from '@angular/core';
import { EquiposService} from "../equipos/equipos.service";
import { Chart } from 'chart.js';
import {forEach} from "@angular/router/src/utils/collection";

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
    RATIO_ATQ : 250,
    RATIO_DEF : 80,
    RATIO_REB : 20,
    RATIO_PAS : 20,
    RATIO_AGR : 20,
    RATIO_SEX : 20,
  };

  DIFERENCIALES = {
    ATQ : 30,
    DEF : 10,
    REB : 5,
    PAS : 5,
    AGR : 5,
    SEX : 5,
  };

  puntos = {
    local : {
      atq : 0,
      def : 0,
      reb : 0,
      pas : 0,
      agr : 0,
      sex : 0,
    },
    visitante : {
      atq : 0,
      def : 0,
      reb : 0,
      pas : 0,
      agr : 0,
      sex : 0,
    }
  };

  chartLocal = [];

  cuarto = 'primero';

  marcador = {
    local : {
      primerCuarto : 0,
      segundoCuarto : 0,
      terceroCuarto : 0,
      cuartoCuarto : 0,
      final : 0,
    },
    visitante : {
      primerCuarto : 0,
      segundoCuarto : 0,
      terceroCuarto : 0,
      cuartoCuarto : 0,
      final : 0,
    }
  };

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

    let puntos = {
      local : {
        atq : 0,
        def : 0,
        reb : 0,
        pas : 0,
        agr : 0,
        sex : 0,
      },
      visitante : {
        atq : 0,
        def : 0,
        reb : 0,
        pas : 0,
        agr : 0,
        sex : 0,
      }
    };
    let teams = ['local','visitante'];

    //Generamos las puntuaciones para cada atributo y equipo
    teams.forEach((t)=>{
      for(let prop in this.puntos[t]){
        this.puntos[t][prop] = this.generarPuntuaciones(t.charAt(0).toUpperCase() + t.slice(1), prop.toUpperCase());
      }
    });

    switch (this.cuarto){
      case 'primero':
        this.marcador.local.primerCuarto = Math.floor(this.generarMarcadores('local') / 4);
        this.marcador.visitante.primerCuarto = Math.floor(this.generarMarcadores('visitante') / 4);
        this.marcador.local.final += this.marcador.local.primerCuarto;
        this.marcador.visitante.final += this.marcador.visitante.primerCuarto;
        break;
      case 'segundo':
        this.marcador.local.segundoCuarto = Math.floor(this.generarMarcadores('local') / 4);
        this.marcador.visitante.segundoCuarto = Math.floor(this.generarMarcadores('visitante') / 4);
        this.marcador.local.final += this.marcador.local.segundoCuarto;
        this.marcador.visitante.final += this.marcador.visitante.segundoCuarto;
        break;
      case 'tercero':
        this.marcador.local.terceroCuarto = Math.floor(this.generarMarcadores('local') / 4);
        this.marcador.visitante.terceroCuarto = Math.floor(this.generarMarcadores('visitante') / 4);
        this.marcador.local.final += this.marcador.local.terceroCuarto;
        this.marcador.visitante.final += this.marcador.visitante.terceroCuarto;
        break;
      case 'cuarto':
        this.marcador.local.cuartoCuarto = Math.floor(this.generarMarcadores('local') / 4);
        this.marcador.visitante.cuartoCuarto = Math.floor(this.generarMarcadores('visitante') / 4);
        this.marcador.local.final += this.marcador.local.cuartoCuarto;
        this.marcador.visitante.final += this.marcador.visitante.cuartoCuarto;
        break;
    }

  };

  generarMarcadores = (equipo) => {
    let teamOposite;
    (equipo === 'local')? teamOposite = 'local': teamOposite = 'visitante';

    return  this.generarRandom(this.puntos[equipo].atq , this.puntos[equipo].atq - this.DIFERENCIALES.ATQ)
        + this.generarRandom(this.puntos[equipo].pas , this.puntos[equipo].pas - this.DIFERENCIALES.PAS)
        + this.generarRandom(this.puntos[equipo].reb , this.puntos[equipo].reb - this.DIFERENCIALES.REB)
        - this.generarRandom(this.puntos[equipo].sex , this.puntos[equipo].sex - this.DIFERENCIALES.SEX)
        - this.generarRandom(this.puntos[teamOposite].def , this.puntos[teamOposite].def - this.DIFERENCIALES.DEF)
        - this.generarRandom(this.puntos[teamOposite].agr , this.puntos[teamOposite].agr - this.DIFERENCIALES.AGR);
  };

  generarRandom = (max , min) => {

    let res = Math.floor(
      Math.random() * (
        max - min
      ) + min
    );
    return res;
  };

  generarPuntuaciones = (equipo,atributo) => {
    let response;
      switch (atributo){
        case 'ATQ' : response = Math.floor((this.RATIOS.RATIO_ATQ * this['equipo'+equipo].medias.ataque) /  100);break;
        case 'DEF' : response = Math.floor((this.RATIOS.RATIO_DEF * this['equipo'+equipo].medias.defensa) /  100);break;
        case 'REB' : response = Math.floor((this.RATIOS.RATIO_REB * this['equipo'+equipo].medias.rebotes) /  100);break;
        case 'PAS' : response = Math.floor((this.RATIOS.RATIO_PAS * this['equipo'+equipo].medias.pase) /  100);break;
        case 'AGR' : response = Math.floor((this.RATIOS.RATIO_AGR * this['equipo'+equipo].medias.agresividad) /  100);break;
        case 'SEX' : response = Math.floor((this.RATIOS.RATIO_SEX * this['equipo'+equipo].medias.sexualidad) /  100);break;
      }
    return response;
  };

  reiniciarPartido = () => {
    this.cuarto = 'primero';
    this.marcador = {
      local : {
        primerCuarto : 0,
        segundoCuarto : 0,
        terceroCuarto : 0,
        cuartoCuarto : 0,
        final : 0,
      },
      visitante : {
        primerCuarto : 0,
        segundoCuarto : 0,
        terceroCuarto : 0,
        cuartoCuarto : 0,
        final : 0,
      }
    };
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
