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
  listadojugadoresSeleccionables = [];
  listadoEquiposSeleccionables = [];
  comunidades = ['Andalucía', 'Aragón', 'Canarias', 'Cantabria', 'Castilla y León', 'Castilla-La Mancha', 'Cataluña', 'Ceuta', 'Comunidad Valenciana', 'Comunidad de Madrid', 'Extremadura', 'Galicia', 'Islas Baleares', 'La Rioja', 'Melilla', 'Navarra', 'País Vasco', 'Principado de Asturias', 'Región de Murcia' , 'Andorra']
  comunidadElegida = '';
  equipoSelector;
  rondaDraft:number = 0;

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

  loadData = () => {

    // if(!(localStorage.getItem('rondaDraft'))){
    //   localStorage.setItem('rondaDraft', '1');
    //   this.rondaDraft = Number((localStorage.getItem('rondaDraft')));
    // }else{
    //   localStorage.setItem('rondaDraft', localStorage.getItem('rondaDraft'));
    //   this.rondaDraft = Number((localStorage.getItem('rondaDraft')));
    // }

    this.rondaDraft = Number((localStorage.getItem('rondaDraft')));

    this._equiposService.getEquiposRest()
      .subscribe(
        result => {
          this.listadoequipos = result.equipos;

          //Vemos los equipos que pueden seleccionar jugadores
          this.listadoEquiposSeleccionables = this.listadoequipos.filter(
            equipo => {return !equipo.jugadores || equipo.jugadores.length < this.rondaDraft}
          );

          //Recogemos el equipo al cual le toca seleccionar jugador
          this._equiposService.getEquipo(this.listadoEquiposSeleccionables[this.listadoEquiposSeleccionables.length -1]._id)
            .subscribe(
              result => {
                this.equipoSelector = result.equipo;
                this._jugadoresService.getJugadoresRest()
                  .subscribe(
                    result => {
                      this.listadojugadores = result.jugadores;
                      this.listadojugadoresSeleccionables = this.listadojugadores.filter(
                        jugador => {return !jugador.team || jugador.team == ''})},
                    error => {console.log('Error al generar listado de jugadores')})
              },
              error => {
                console.log('Error al captura equipo');
              })
        },
        error => {
          console.log(`Error al llamar servicio getEquipos()`);
        }
      )
  };

  seleccionarJugador  = function(jugador){
    let _equipo = this.equipoSelector;

    this._equiposService.getEquipo(_equipo._id)
      .subscribe(
        result => {
          _equipo = result.equipo;
          this._jugadoresService.getJugador(jugador._id)
            .subscribe(
              result => {
                let _jugador = result.jugador;
                let body = {jugadores : _equipo.jugadores};
                body.jugadores.push(_jugador);
                this._equiposService.updateEquipo(_equipo._id, body)
                  .subscribe(
                    result => {
                      let body = {team : _equipo.name}
                      this._jugadoresService.updateJugador(_jugador._id,body)
                        .subscribe(
                          result => {
                            if(this.listadoequipos.filter(
                              equipo => {return equipo.jugadores.length == this.rondaDraft}
                              ).length == this.listadoequipos.length-1){
                              this.rondaDraft++;
                              localStorage.setItem('rondaDraft',this.rondaDraft.toString());
                            }
                            this.loadData();
                          },
                         error => {console.log(`Error al actualizar jugador`)})},
                    error => {console.log(`Error al actualizar equipo`)})},
              error => {console.log(`Error al recoger jugador seleccionado`)})},
        error => {console.log(`Error al recoger equipo seleccionado`)});
  };


  generateEquipos = function(){
    var self = this;
    this.comunidades.forEach(function(comunidad){
     let body = { 'name' : comunidad};
      self._equiposService.newEquipo(body)
       .subscribe(
         result => {
           localStorage.setItem('rondaDraft' , '1');
         },
         error => {
           console.log(`Error al llamar servicio newEquipo()`);
           alert(error);
         }
       )
    })
    this.getEquipos();
  };

  eliminarEquipos = function(){

    this.listadoequipos.forEach((equipo)=> {
      this._equiposService.deleteEquipo(equipo._id)
        .subscribe(
          result => {
            localStorage.removeItem('rondaDraft');
          }
        )
    })

  };

  ngOnInit() {
    this.loadData()
    //this.getEquipos();
    //this.generarDraft();
  }

}
