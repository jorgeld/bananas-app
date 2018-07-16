import {Component, Input, OnInit} from '@angular/core';
import {EquiposService} from "../equipos/equipos.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.css'],
  providers:[EquiposService]
})
export class LigaComponent implements OnInit {

  constructor( private _equiposService: EquiposService ) { }

  auxLiga = [] ;
  jornadas = [];
  equipos = [];

  generandoLiga = () => {
  //funcion que desordena el array para generar la jornada base inicial
  function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }

//funcionamiento de calculo si es jornada par
  function crearJornadaPar(arrayBase){
    var arrAux = [];
    var longitudArrayBase = arrayBase.length;
    for (var i=0; i<longitudArrayBase; i++){
      if (i % 2 == 0){
        arrAux[i+1] = arrayBase[i];
      } else {
        if (i == 1){
          arrAux[longitudArrayBase - 2] = arrayBase[i];
        } else {
          arrAux[i-3] = arrayBase[i];
        }
      }
    }
    return arrAux;
  }

    // //Asignar equipos
    // var equipos = ["Osasuna", "Eibar", "Alaves", "Athletic", "Barcelona", "Real Madrid",
    //   "Sevilla", "Atletico de Madrid", "Real Sociedad", "Villareal",
    //   "Leganes", "Granada", "Deportivo", "Celta", "Sporting", "Espanyol",
    //   "Malaga", "Betis", "Valencia", "Las Palmas"];

    let equipos = this.equipos;

    //Jornadas Total de la ida
    let jornadasTotal = [];
    //Variable donde se almacenan los arrays de la ida y de la vuelta
    let calendarioFinal = [];
    let jornadaBase = shuffle(equipos);



  //funcionamiento si es una jornada impar
  function crearJornadaImpar(arrayBase){
    var arrAux = [];
    var longitudArrayBase = arrayBase.length;
    for (var i=0; i<longitudArrayBase; i++){
      if (i == 0 || i == longitudArrayBase - 1 || i == longitudArrayBase){
        if (i == 0 || i == longitudArrayBase){
          arrAux[i] = arrayBase[i];
        } else if (i == longitudArrayBase - 1){
          arrAux[1] = arrayBase[longitudArrayBase - 1];
        }
      } else {
        arrAux[i+1] = arrayBase[i];
      }
    }
    return arrAux;
  }

  // generar el calendario de ida a partir de una jornada tomada como base
  function generarCalendario(jornadasTotal, jornadaBase){
    jornadasTotal.push(jornadaBase);
    for(var i=2;i<jornadaBase.length;i++){
      if (i % 2 == 0){
        var jornadaAuxPar = crearJornadaPar(jornadaBase);
        jornadasTotal.push(jornadaAuxPar);
        jornadaBase = jornadaAuxPar;
      } else {
        var jornadaAuxImpar = crearJornadaImpar(jornadaBase);
        jornadasTotal.push(jornadaAuxImpar);
        jornadaBase = jornadaAuxImpar;
      }
    }
    return jornadasTotal;
  }

  function generarCalendarioVuelta(calendarioIda){
    var calArr = [];
    for (var i=0; i<calendarioIda.length;i++){
      var aux = calendarioIda[i].reverse();
      calArr[i] = aux;
    }
    return calArr;
  }

  //Genero el calendario de la ida
  var arrayCalendarioIda = generarCalendario(jornadasTotal, jornadaBase);
  //document.getElementById("ida").innerHTML = pintarJornadasHTML(arrayCalendarioIda, 1);
  //Agregamos ida
  calendarioFinal.push(arrayCalendarioIda);

  //Genero calendario de vuelta
  var arrayCalendarioVuelta = generarCalendarioVuelta(arrayCalendarioIda);
  //document.getElementById("vuelta").innerHTML = pintarJornadasHTML(arrayCalendarioVuelta, 2);
  //Agregamos vuelta
  calendarioFinal.push(arrayCalendarioVuelta);
  this.auxLiga = calendarioFinal;
  this.organizandoCalendario();
  };

  organizandoCalendario = () => {
    this.auxLiga.forEach((vuelta) => {
      vuelta.forEach((jornadas) => {
        this.jornadas.push(this.generandoPartidosJornada(jornadas));
      })
    })
  };

  generandoPartidosJornada = (equipos) => {

    return [
      {local:equipos[0],visitante:equipos[1],marcador:''},
      {local:equipos[2],visitante:equipos[3],marcador:''},
      {local:equipos[4],visitante:equipos[5],marcador:''},
      {local:equipos[6],visitante:equipos[7],marcador:''},
      {local:equipos[8],visitante:equipos[9],marcador:''},
      {local:equipos[10],visitante:equipos[11],marcador:''},
      {local:equipos[12],visitante:equipos[13],marcador:''},
      {local:equipos[14],visitante:equipos[15],marcador:''},
      {local:equipos[16],visitante:equipos[17],marcador:''},
      {local:equipos[18],visitante:equipos[19],marcador:''},
    ];
  };

  ngOnInit() {

    this._equiposService.getEquiposRest()
      .subscribe(
        res => {
          this.equipos = res.equipos;
          this.generandoLiga();
        }
      );
  }

}
