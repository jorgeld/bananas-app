import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DataService } from "../../data.service";

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
  inputs:['equipoLocal','equipoVisitante','marcador']
})
export class PartidoComponent implements OnInit {

  constructor(private data: DataService) { }

  @Input() equipoLocal: object;
  @Input() equipoVisitante: object;
  @Input() marcador: any;
  @Output() public resultadoPartido = new EventEmitter();

  public enviandoResultadoPartido = (marcador) => {
    this.resultadoPartido.emit(marcador);
  };
  private marcadorEquipo1;
  private marcadorEquipo2;

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

  playGame = (partido) => {
    this.marcador = '32-65';
    let puntos = {
      equipo1 : {},
      equipo2 : {}
    };

    //Generamos medias
    partido.equipo1.medias = this.generarMedias(partido.equipo1.jugadores);
    partido.equipo2.medias = this.generarMedias(partido.equipo2.jugadores);

    //Generamos las puntuaciones para cada atributo y equipo
    let equipos = ['equipo1','equipo2'];
    let atributos = ['atq','def','reb','pas','agr','sex'];

    equipos.forEach((equipo)=>{
      atributos.forEach((atributo) => {
        puntos[equipo][atributo] = this.generarPuntuaciones(partido[equipo], atributo.toUpperCase());
      });
      //generamos marcador
      this.marcadorEquipo1 = Math.floor(this.generarMarcadores('equipo1',puntos))
      this.marcadorEquipo2 = Math.floor(this.generarMarcadores('equipo2',puntos))
      this.marcador = ''+this.marcadorEquipo1 +' - '+this.marcadorEquipo2;
    });

    let resultado = {
      ganador : {
        equipo : {},
        puntosFavor : 0,
        puntosContra:0
      },
      perdedor : {
        equipo : {},
        puntosFavor : 0,
        puntosContra:0
      }
    };

    //Chequeamos que no hay empate
    if(this.marcadorEquipo1 !== this.marcadorEquipo2){

      if(this.marcadorEquipo1 > this.marcadorEquipo2){
        resultado.ganador.equipo = partido.equipo1;
        resultado.ganador.puntosContra = this.marcadorEquipo2;
        resultado.ganador.puntosFavor = this.marcadorEquipo1;
        resultado.perdedor.equipo = partido.equipo2;
        resultado.perdedor.puntosContra = this.marcadorEquipo1;
        resultado.perdedor.puntosFavor = this.marcadorEquipo2;
      }else{
        resultado.ganador.equipo = partido.equipo2;
        resultado.ganador.puntosContra = this.marcadorEquipo1;
        resultado.ganador.puntosFavor = this.marcadorEquipo2;
        resultado.perdedor.equipo = partido.equipo1;
        resultado.perdedor.puntosContra = this.marcadorEquipo2;
        resultado.perdedor.puntosFavor = this.marcadorEquipo1;
      }

    }

    this.nuevoResultado(resultado);

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

  nuevoResultado(param){
    this.data.cambiandoMensaje(param);
  }

  ngOnInit() {

  }

}
