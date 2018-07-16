import {Component, OnInit} from '@angular/core';
import {Torneo} from "../../clases/torneo"
import { EquiposService} from "../equipos/equipos.service";
import {forEach} from "@angular/router/src/utils/collection";
import {TorneosService} from "./torneos.service";

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css'],
  providers:[ EquiposService,TorneosService]
})
export class TorneosComponent implements OnInit {

  constructor(
    private _equiposService: EquiposService,
    private _torneosService: TorneosService,
    ) {}

  numbers = {
    octavos : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    cuartos : [0,1,2,3,4,5,6,7],
    semifinales : [0,1,2,3],
    final : [0,1]
  };
  equipos_octavos = [];
  equipos_cuartos = [];
  equipos_semifinales = [];
  equipos_final = [];
  campeon;
  RONDAS = 7;
  RATIOS = {
    RATIO_ATQ : 250,
    RATIO_DEF : 80,
    RATIO_REB : 20,
    RATIO_PAS : 20,
    RATIO_AGR : 20,
    RATIO_SEX : 20,
  };
  DIFERENCIALES = {
    ATQ : 40,
    DEF : 10,
    REB : 5,
    PAS : 5,
    AGR : 5,
    SEX : 5,
  };
  torneo = {
    octavos : {
      eliminatorias : []
    },
    cuartos : {
      eliminatorias : []
    },
    semifinales : {
      eliminatorias : []
    },
    final : {
      eliminatorias : []
    },
  };

  getEquiposList = () => {
    this._equiposService.getEquiposRest()
      .subscribe(
        res =>{
          this.equipos_octavos = res.equipos;

          console.log(this.equipos_octavos);

          this.rellenarTorneo('octavos');
        },
        error =>{}
      )
  };

  rellenarTorneo = (ronda) => {

   while(this.numbers[ronda].length > 0){
        let equipoAleatorio1 = this['equipos_'+ronda][this.seleccionAleatoria(ronda)];
        let equipoAleatorio2 = this['equipos_'+ronda][this.seleccionAleatoria(ronda)];
        let eliminatoria = {
          equipo1 : equipoAleatorio1,
          equipo2 :equipoAleatorio2,
          ronda:1,
          partidos : [
            {
              marcador_equipo1 : 0,
              marcador_equipo2 : 0,
              ganador:'',
            }
          ],
          estadoEliminatoria : {
            victorias_equipo1 : 0,
            victorias_equipo2 : 0,
          },
          ganador : null
        };

        this.torneo[ronda].eliminatorias.push(eliminatoria)
      }

  };

  playGame = (eliminatoria,fase) => {

    let puntos = {
      equipo1 : {},
      equipo2 : {}
    };

    if(eliminatoria.ronda <= this.RONDAS){

      //Generamos medias.
      eliminatoria.equipo1.medias = this.generarMedias(eliminatoria.equipo1.jugadores);
      eliminatoria.equipo2.medias = this.generarMedias(eliminatoria.equipo2.jugadores);


      //Generamos las puntuaciones para cada atributo y equipo
      let equipos = ['equipo1','equipo2'];
      let atributos = ['atq','def','reb','pas','agr','sex'];

      equipos.forEach((equipo)=>{
        atributos.forEach((atributo) => {
          puntos[equipo][atributo] = this.generarPuntuaciones(eliminatoria[equipo], atributo.toUpperCase());
        });
        //generamos marcador
        eliminatoria.partidos[eliminatoria.ronda-1]['marcador_'+equipo]= Math.floor(this.generarMarcadores(equipo,puntos));
      });



      let marcadores = ['marcador_equipo1','marcador_equipo2'];


      //SI GANAN LOCALES
      if(eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo1'] > eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo2']){
        //Marcamos ganador
        eliminatoria.partidos[eliminatoria.ronda-1].ganador = eliminatoria.equipo1;
        //Aumentamos victoria local en Global Eliminatoria
        eliminatoria.estadoEliminatoria.victorias_equipo1++;
        //Guardamos marcador del partido para que se refleje en el frontal
        eliminatoria.ultimoPartido1 = ''+eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo1'];
        eliminatoria.ultimoPartido2 = ''+eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo2'];
        //Chequeamos si hay ganador de eliminatoria. En caso no de haber, aumentamos una ronda
        if(eliminatoria.estadoEliminatoria.victorias_equipo1 !== 4 ){
          //Al no finalizar la eliminatoria, aumentamos ronda
          eliminatoria.ronda++;
          //Generamos el nuevo partido
          let partido ={
            marcador_equipo1 : 0,
            marcador_equipo2 : 0,
            ganador:'',
          };
          eliminatoria.partidos.push(partido);
        // Si el equipo local llega a 4 victorias lo marcamos como ganador de la eliminatoria
        }else{
          eliminatoria.ganador = eliminatoria.equipo1;
          //Añadimos el ganador al array de equipos de la siguiente ronda;
          switch (fase){
            case 'octavos' :
              this.equipos_cuartos.push(eliminatoria.equipo1);
              if(this.equipos_cuartos.length === 8) {
                this.startCuartos()
              }break;

            case 'cuartos' :
              this.equipos_semifinales.push(eliminatoria.equipo1);
              if(this.equipos_semifinales.length === 4) {
                this.startSemifinales()
              }break;

            case 'semifinales' :
              this.equipos_final.push(eliminatoria.equipo1);
              if(this.equipos_final.length === 2) {
                this.startFinal()
              }break;

            case 'final' :
              this.finalizarTorneo(eliminatoria);
              this.campeon = eliminatoria.equipo1;
              this.aumentarPalmares(this.campeon);
              break;

          }

          eliminatoria.ultimoPartido1 = ''+eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo1'];
          eliminatoria.ultimoPartido2 = ''+eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo2'];
        }

      //SI GANA VISITANTE
      }else if(eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo1'] < eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo2']){
        //Marcamos ganador
        eliminatoria.partidos[eliminatoria.ronda-1].ganador = eliminatoria.equipo2;
        //Aumentamos victoria visitante en Global Eliminatoria
        eliminatoria.estadoEliminatoria.victorias_equipo2++;
        //Guardamos marcador del partido para que se refleje en el frontal
        eliminatoria.ultimoPartido1 = ''+eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo1'];
        eliminatoria.ultimoPartido2 = ''+eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo2'];
        //Chequeamos si hay ganador de eliminatoria. En caso no de haber, aumentamos una ronda
        if(eliminatoria.estadoEliminatoria.victorias_equipo2 !== 4 ){
          //Al no finalizar la eliminatoria, aumentamos ronda
          eliminatoria.ronda++;
          //Generamos el nuevo partido
          let partido ={
            marcador_equipo1 : 0,
            marcador_equipo2 : 0,
            ganador:'',
          };
          eliminatoria.partidos.push(partido);
        // Si el equipo visitante llega a 4 victorias lo marcamos como ganador de la eliminatoria
        }else{
          eliminatoria.ganador = eliminatoria.equipo2;
          //Añadimos el ganador al array de equipos de la siguiente ronda;
          switch (fase){
            case 'octavos' :
              this.equipos_cuartos.push(eliminatoria.equipo2);
              if(this.equipos_cuartos.length === 8) {
                this.startCuartos()
              }break;

            case 'cuartos' :
              this.equipos_semifinales.push(eliminatoria.equipo2);
              if(this.equipos_semifinales.length === 4) {
                this.startSemifinales()
              }break;

            case 'semifinales' :
              this.equipos_final.push(eliminatoria.equipo2);
              if(this.equipos_final.length === 2) {
                this.startFinal()
              }break;

            case 'final' :
              this.finalizarTorneo(eliminatoria);
              this.campeon = eliminatoria.equipo2;
              this.aumentarPalmares(this.campeon);
                // .subscribe(
                //   res =>{
                //     this.equipos_octavos = res.equipos;
                //
                //     console.log(this.equipos_octavos);
                //
                //     this.rellenarTorneo('octavos');
                //   },
                //   error =>{}
                // )
              break;
          }

          //Guardamos marcador del partido para que se refleje en el frontal
          eliminatoria.ultimoPartido1 = ''+eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo1'];
          eliminatoria.ultimoPartido2 = ''+eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo2'];
        }
      //SI EMPATAN
      }else{
        eliminatoria.ultimoPartido1 = ''+eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo1'];
        eliminatoria.ultimoPartido2 = ''+eliminatoria.partidos[eliminatoria.ronda-1]['marcador_equipo2'];
        eliminatoria.partidos.slice(eliminatoria.partidos.length -1 ,1)
      }

    }

  };

  generarMedias = (jugadores) => {

    let sumatorio = {
      ataque : 0,
      defensa : 0,
      rebotes : 0,
      pase : 0,
      agresividad : 0,
      sexualidad : 0
    };

    let medias = {
      ataque : 0,
      defensa : 0,
      rebotes : 0,
      pase : 0,
      agresividad : 0,
      sexualidad : 0
    };

    jugadores.forEach((jugador) => {
      sumatorio.ataque += jugador.atributos.ataque;
      sumatorio.defensa += jugador.atributos.defensa;
      sumatorio.rebotes += jugador.atributos.rebotes;
      sumatorio.pase += jugador.atributos.pase;
      sumatorio.agresividad += jugador.atributos.agresividad;
      sumatorio.sexualidad += jugador.atributos.sexualidad;
    });

    medias.ataque = sumatorio.ataque / 10;
    medias.defensa = sumatorio.defensa / 10;
    medias.rebotes = sumatorio.rebotes / 10;
    medias.pase = sumatorio.pase / 10;
    medias.agresividad = sumatorio.agresividad / 10;
    medias.sexualidad = sumatorio.sexualidad / 10;

    return medias;

  };

  generarRandom = (max , min) => {

    let res = Math.floor(
      Math.random() * (
        max - min
      ) + min
    );
    return res;
  };

  seleccionAleatoria = (ronda) => {
     let num = Math.floor((Math.random() * (this.numbers[ronda].length)));
     let res = this.numbers[ronda][num];
     this.numbers[ronda].splice(num,1);
     return res;
  };

  generarPuntuaciones = (equipo,atributo) => {
    let response;
    switch (atributo){
      case 'ATQ' : response = Math.floor((this.RATIOS.RATIO_ATQ * equipo.medias.ataque) /  100);break;
      case 'DEF' : response = Math.floor((this.RATIOS.RATIO_DEF * equipo.medias.defensa) /  100);break;
      case 'REB' : response = Math.floor((this.RATIOS.RATIO_REB * equipo.medias.rebotes) /  100);break;
      case 'PAS' : response = Math.floor((this.RATIOS.RATIO_PAS * equipo.medias.pase) /  100);break;
      case 'AGR' : response = Math.floor((this.RATIOS.RATIO_AGR * equipo.medias.agresividad) /  100);break;
      case 'SEX' : response = Math.floor((this.RATIOS.RATIO_SEX * equipo.medias.sexualidad) /  100);break;
    }
    return response;
  };

  generarMarcadores = (equipo,puntos) => {
    let teamOposite;
    (equipo === 'equipo1')? teamOposite = 'equipo1': teamOposite = 'equipo2';

    return  this.generarRandom(puntos[equipo].atq , puntos[equipo].atq - this.DIFERENCIALES.ATQ)
      + this.generarRandom(puntos[equipo].pas , puntos[equipo].pas - this.DIFERENCIALES.PAS)
      + this.generarRandom(puntos[equipo].reb , puntos[equipo].reb - this.DIFERENCIALES.REB)
      - this.generarRandom(puntos[equipo].sex , puntos[equipo].sex - this.DIFERENCIALES.SEX)
      - this.generarRandom(puntos[teamOposite].def , puntos[teamOposite].def - this.DIFERENCIALES.DEF)
      - this.generarRandom(puntos[teamOposite].agr , puntos[teamOposite].agr - this.DIFERENCIALES.AGR);
  };

  startCuartos = () => {
    this.rellenarTorneo('cuartos');
  };

  startSemifinales = () => {
    this.rellenarTorneo('semifinales');
  };

  startFinal = () => {
    this.rellenarTorneo('final');
  };

  finalizarTorneo = (eliminatoria) => {

    console.log('FIN TORNEO ------> ' ,eliminatoria);
    let t;

    if(eliminatoria.estadoEliminatoria.victorias_equipo1 > eliminatoria.estadoEliminatoria.victorias_equipo2){
      let resultado = eliminatoria.estadoEliminatoria.victorias_equipo1 + ' - ' + eliminatoria.estadoEliminatoria.victorias_equipo2;
      t = new Torneo(eliminatoria.equipo1._id ,eliminatoria.equipo2._id ,resultado);
    }else{
      let resultado = eliminatoria.estadoEliminatoria.victorias_equipo2 + ' - ' + eliminatoria.estadoEliminatoria.victorias_equipo1;
      t = new Torneo(eliminatoria.equipo2._id ,eliminatoria.equipo1._id,resultado);
    }

    this._torneosService.newTorneo(t)
      .subscribe(
        res =>{ console.log('devolución servicio -----> ' , res)
        },
        error =>{}
      )

  };

  aumentarPalmares = (ganador) => {

    console.log('Actualizando equipo ---->', ganador);

    if(ganador.hasOwnProperty('palmares')){
      ganador.palmares = ganador.palmares + 1;
    }else{
      ganador.palmares = 1;
    }

    this._equiposService.updateEquipo(ganador._id, ganador)
      .subscribe(
        res =>{
        },
        error =>{}
      )
  };


  ngOnInit() {
    this.getEquiposList();
  }

}
