import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.css']
})
export class LigaComponent implements OnInit {

  constructor() { }

  //
//
//   //funcion que desordena el array para generar la jornada base inicial
//   function shuffle(array) {
//     let counter = array.length;
//     while (counter > 0) {
//       let index = Math.floor(Math.random() * counter);
//       counter--;
//       let temp = array[counter];
//       array[counter] = array[index];
//       array[index] = temp;
//     }
//     return array;
//   }
//
// //funcionamiento de calculo si es jornada par
//   function crearJornadaPar(arrayBase){
//     var arrAux = [];
//     var longitudArrayBase = arrayBase.length;
//     for (var i=0; i<longitudArrayBase; i++){
//       if (i % 2 == 0){
//         arrAux[i+1] = arrayBase[i];
//       } else {
//         if (i == 1){
//           arrAux[longitudArrayBase - 2] = arrayBase[i];
//         } else {
//           arrAux[i-3] = arrayBase[i];
//         }
//       }
//     }
//     return arrAux;
//   }
//
//   //Asignar equipos
//   var equipos = ["Osasuna", "Eibar", "Alaves", "Athletic", "Barcelona", "Real Madrid",
//     "Sevilla", "Atletico de Madrid", "Real Sociedad", "Villareal",
//     "Leganes", "Granada", "Deportivo", "Celta", "Sporting", "Espanyol",
//     "Malaga", "Betis", "Valencia", "Las Palmas"];
//   //Jornadas Total de la ida
//   var jornadasTotal = [];
//   //Variable donde se almacenan los arrays de la ida y de la vuelta
//   var calendarioFinal = [];
//   var jornadaBase = shuffle(equipos);
//
//   //funcionamiento si es una jornada impar
//   function crearJornadaImpar(arrayBase){
//     var arrAux = [];
//     var longitudArrayBase = arrayBase.length;
//     for (var i=0; i<longitudArrayBase; i++){
//       if (i == 0 || i == longitudArrayBase - 1 || i == longitudArrayBase){
//         if (i == 0 || i == longitudArrayBase){
//           arrAux[i] = arrayBase[i];
//         } else if (i == longitudArrayBase - 1){
//           arrAux[1] = arrayBase[longitudArrayBase - 1];
//         }
//       } else {
//         arrAux[i+1] = arrayBase[i];
//       }
//     }
//     return arrAux;
//   }
//
//   // generar el calendario de ida a partir de una jornada tomada como base
//   function generarCalendario(jornadasTotal, jornadaBase){
//     jornadasTotal.push(jornadaBase);
//     for(var i=2;i<jornadaBase.length;i++){
//       if (i % 2 == 0){
//         var jornadaAuxPar = crearJornadaPar(jornadaBase);
//         jornadasTotal.push(jornadaAuxPar);
//         jornadaBase = jornadaAuxPar;
//       } else {
//         var jornadaAuxImpar = crearJornadaImpar(jornadaBase);
//         jornadasTotal.push(jornadaAuxImpar);
//         jornadaBase = jornadaAuxImpar;
//       }
//     }
//     return jornadasTotal;
//   }
//
//   function generarCalendarioVuelta(calendarioIda){
//     var calArr = [];
//     for (var i=0; i<calendarioIda.length;i++){
//       var aux = calendarioIda[i].reverse()
//       calArr[i] = aux;
//     }
//     return calArr;
//   }
//
//   //Genero el calendario de la ida
//   var arrayCalendarioIda = generarCalendario(jornadasTotal, jornadaBase);
//   //document.getElementById("ida").innerHTML = pintarJornadasHTML(arrayCalendarioIda, 1);
//   //Agregamos ida
//   calendarioFinal.push(arrayCalendarioIda);
//
//   //Genero calendario de vuelta
//   var arrayCalendarioVuelta = generarCalendarioVuelta(arrayCalendarioIda);
//   //document.getElementById("vuelta").innerHTML = pintarJornadasHTML(arrayCalendarioVuelta, 2);
//   //Agregamos vuelta
//   calendarioFinal.push(arrayCalendarioVuelta);
//
//
//   console.log(calendarioFinal)

  ngOnInit() {
  }

}
