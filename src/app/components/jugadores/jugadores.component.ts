import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { JugadoresService } from '../jugadores/jugadores.service';
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
  providers : [JugadoresService]
})
export class JugadoresComponent implements OnInit {

  constructor(private _jugadoresService: JugadoresService, private _appComponent: AppComponent) { }

  listadojugadores = [];
  pivots = [] ;
  ala_pivots = [];
  aleros = [];
  escoltas = [];
  bases = [];

  getJugadores = function(){
    var self = this;
    this._jugadoresService.getJugadoresRest()
      .subscribe(
        result => {
          this.listadojugadores = result.jugadores;

          this.pivots = this.listadojugadores.filter(function(j){return j.posicion == 'PIVOT'});
          this.ala_pivots = this.listadojugadores.filter(function(j){return j.posicion == 'ALA-PIVOT'});
          this.aleros = this.listadojugadores.filter(function(j){return j.posicion == 'ALERO'});
          this.escoltas = this.listadojugadores.filter(function(j){return j.posicion == 'ESCOLTA'});
          this.bases = this.listadojugadores.filter(function(j){return j.posicion == 'BASE'});

        },
        error => {
          console.log(`Error al llamar servicio getJugadores()`);
          alert(error);
        }
      )
  };

  newJugador = function(){
    this._jugadoresService.newJugador()
      .subscribe(
        result =>{
          console.log(`Creado correctamente : ${result.jugador.posicion}`);
          this.getJugadores();
        },
        error => {
          console.log(`Error al crear jugador ----> ${error}`);
          alert(error);
        }
      )
  };

  newJugadorByPosition = function(data){

    let bodyParse = {
      'puesto' : data,
    };

    this._jugadoresService.newJugador(bodyParse)
      .subscribe(
        result =>{
          console.log(`Creado correctamente : ${result.jugador.posicion}`);
          console.log(result);
          this.getJugadores();
        },
        error => {
          console.log(`Error al crear jugador ----> ${error}`);
          alert(error);
        }
      )
  };

  deleteJugador = function(idJugador){
    this._jugadoresService.deleteJugador(idJugador)
      .subscribe(
        result =>{
          console.log(`Borrado correctamente : ${result}`);
          this.getJugadores();
        },
        error => {
          console.log(`Error al eliminar jugador ----> ${error}`);
          alert(error);
        }
      )
  };

  ngOnInit() {
    this.getJugadores();
  }

}
