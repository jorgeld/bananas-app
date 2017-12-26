import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../equipos/equipos.service';
import { JugadoresService } from '../jugadores/jugadores.service';
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
  providers : [EquiposService,JugadoresService]
})
export class EquiposComponent implements OnInit {

  constructor(
    private _equiposService: EquiposService,
    private _jugadoresService: JugadoresService ,
    private _appComponent: AppComponent)
  { }

  listadoequipos = [];
  listadojugadores = [];
  listadoEquiposSeleccionables = [];
  comunidades = ['Andalucía', 'Aragón', 'Canarias', 'Cantabria', 'Castilla y León', 'Castilla-La Mancha', 'Cataluña', 'Ceuta', 'Comunidad Valenciana', 'Comunidad de Madrid', 'Extremadura', 'Galicia', 'Islas Baleares', 'La Rioja', 'Melilla', 'Navarra', 'País Vasco', 'Principado de Asturias', 'Región de Murcia' , 'Andorra']
  comunidadElegida = '';
  equipoSelector;
  rondaDraft:number = 1 ;

  getEquipos = function(){
    this._equiposService.getEquiposRest()
      .subscribe(
        result => {
          this.listadoequipos = result.equipos;
        },
        error => {
          console.log(`Error al llamar servicio getEquipos()`);
        }
      )
  };

  loadData = (rondadraft) => {
    this._equiposService.getEquiposRest()
      .subscribe(
        result => {
          this.listadoequipos = result.equipos;

          //Vemos los equipos que pueden seleccionar jugadores
          this.listadoEquiposSeleccionables = this.listadoequipos.filter(function(equipo){
            return equipo.jugadores.length <= rondadraft;
          });

          this._equiposService.getEquipo(this.listadoEquiposSeleccionables[this.listadoEquiposSeleccionables.length -1]._id)
            .subscribe(
              result => {
                this.equipoSelector = result.equipo;

                this._jugadoresService.getJugadoresRest()
                  .subscribe(
                    result => {
                      this.listadojugadores = result.jugadores;
                    }
                  )



              },
              error => {
                console.log('Error al captura equipo');
              }
            )

          //Aumentamos la ronda del draft
          this.rondaDraft++;





        },
        error => {
          console.log(`Error al llamar servicio getEquipos()`);
        }
      )
  }

  seleccionarJugador  = function(jugador){
    this._jugadoresService.getJugador(jugador._id)
      .subscribe(
        result => {
          this._equiposService.getEquipo(this.equipoSelector._id)
            .subscribe(
              result => {
                let body = {
                  jugadores : result.equipo.jugadores
                }

                body.jugadores.push(jugador)
                this._equiposService.updateEquipo(result.equipo._id, body)
                  .subscribe(
                    result => {
                      console.log('añadido jugador')
                    }
                  )
              }
            )
        }
      )
  }


  generateEquipos = function(){
    var self = this;
    this.comunidades.forEach(function(comunidad){
     let body = { 'name' : comunidad};
      self._equiposService.newEquipo(body)
       .subscribe(
         result => {
           console.log('EQUIPO CREADO ----> ' , result )},
         error => {
           console.log(`Error al llamar servicio newEquipo()`);
           alert(error);
         }
       )
    })

    this.getEquipos();
  };

  ngOnInit() {
    this.loadData(this.rondaDraft)
    //this.getEquipos();
    //this.generarDraft();
  }

}
