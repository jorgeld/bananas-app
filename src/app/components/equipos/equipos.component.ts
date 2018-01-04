import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../equipos/equipos.service';
import { JugadoresService } from '../jugadores/jugadores.service';
import { UtilsService } from '../utils/utils.service';
import { AppComponent } from '../../app.component'
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
  providers : [EquiposService,JugadoresService,UtilsService]
})
export class EquiposComponent implements OnInit {

  constructor(
    private _equiposService: EquiposService,
    private _jugadoresService: JugadoresService,
    private _utilsService: UtilsService,
    private _appComponent: AppComponent)
  { }

  listadoequipos = [];
  listadojugadores = [];
  listadojugadoresSeleccionables = [];
  listadoEquiposSeleccionables = [];
  comunidades = ['Andalucía', 'Aragón', 'Canarias', 'Cantabria', 'Castilla y León', 'Castilla-La Mancha', 'Cataluña', 'Ceuta', 'Comunidad Valenciana', 'Comunidad de Madrid', 'Extremadura', 'Galicia', 'Islas Baleares', 'La Rioja', 'Melilla', 'Navarra', 'País Vasco', 'Principado de Asturias', 'Región de Murcia' , 'Andorra']
  equipoSelector;
  rondaDraft:number = 0;
  generandoEquipos:false;
  eliminandoEquipos:false;
  vaciarJugadoresEquipo:false;

  max_p = false;
  max_ap = false;
  max_a = false;
  max_e = false;
  max_b = false;

  loadData = () => {

    //Eliminamos datos pendientes
    this.borrarDatos();

    // Recogemos la ronda del draf correspondiente
    this.rondaDraft = Number((localStorage.getItem('rondaDraft')));

    //Recogemos todos los equipos
    this._equiposService.getEquiposRest()
      .subscribe(
        result => {
          this.listadoequipos = result.equipos;

          //A cada equipo le ponemos un atributo para reconocer si es seleccionable o no
          this.listadoequipos.map(
            res => {
              if(res.jugadores.length < this.rondaDraft){
                res.seleccionable = true;
              }
            }
          );

          //Guardamos en un array los equipos que pueden seleccionar jugadores
          this.listadoEquiposSeleccionables = this.listadoequipos.filter(
            equipo => {return equipo.seleccionable}
          );

          //Recogemos el equipo al cual le toca seleccionar jugador
          this._equiposService.getEquipo(this.listadoEquiposSeleccionables[this.listadoEquiposSeleccionables.length -1]._id)
            .subscribe(
              result => {
                this.equipoSelector = result.equipo;
                this.equipoSelector.totales = {pivot:0,alapivot:0, alero:0, escolta:0, base:0};
                //let jugadoresEquipo = [ {pivot : []},{alapivot : []} , {alero :[]} , {escolta : []} ,{base : []} ];
                //Organizamos el array de jugadores del equipo seleccionado
                if(this.equipoSelector.jugadores.length > 0 || this.equipoSelector.jugadores.length ){
                  this.equipoSelector.jugadores.forEach(
                    jugador => {
                      switch (jugador.posicion){
                        case "PIVOT" :
                          this.equipoSelector.totales.pivot++;
                          if(this.equipoSelector.totales.pivot == 2){this.max_p = true};
                          break;
                        case "ALA-PIVOT" :
                          this.equipoSelector.totales.alapivot++;
                          if(this.equipoSelector.totales.alapivot == 2){this.max_ap = true};
                          break;
                        case "ALERO" :
                          this.equipoSelector.totales.alero++;
                          if(this.equipoSelector.totales.alero == 2){this.max_a = true};
                          break;
                        case "ESCOLTA" :
                          this.equipoSelector.totales.escolta++;
                          if(this.equipoSelector.totales.escolta == 2){this.max_e = true};
                          break;
                        case "BASE" :
                          this.equipoSelector.totales.base++;
                          if(this.equipoSelector.totales.base == 2){this.max_b = true};
                          break;
                      }
                    }
                  )
                }

                this._jugadoresService.getJugadoresRest()
                  .subscribe(
                    result => {
                      this.listadojugadores = result.jugadores;
                      this.listadojugadoresSeleccionables = this.listadojugadores.filter(
                        jugador => {return !jugador.team || jugador.team == ''})},
                    error => {console.log('Error al generar listado de jugadores')})
              },error => {
                console.log('Error al captura equipo');
              }
            )},error => {
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

    let observables = [];
    this.generandoEquipos = true;

    this.comunidades.forEach(comunidad => {
      let body = { 'name' : comunidad};
      observables.push(this._equiposService.newEquipo(body))
    });

    Observable.forkJoin(observables)
      .subscribe(
        result => {localStorage.setItem('rondaDraft' , '1');},
        error => {console.log(`Error al llamar servicio newEquipo()`);},
        ()=>{
          this.generandoEquipos = false;
          // this.borrarDatos();
          this.loadData();
        }
      );
  };

  eliminarEquipos = function(){

    let observables = [];
    this.eliminandoEquipos = true;

    this.listadoequipos.forEach((equipo)=>{
      observables.push(this._equiposService.deleteEquipo(equipo._id))
    });

    Observable.forkJoin(observables)
      .subscribe(
        result => {},
        () => console.log('error'),
        () => {
          localStorage.removeItem('rondaDraft');
          this.eliminandoEquipos = false;
          this.loadData();
        }
      )
  };

  vaciarEquipos = function(){
    let observables = [];
    let equipos = [];
    this.vaciarJugadoresEquipo = true;

    this.listadoequipos.forEach((equipo)=>{
      let body = {jugadores : []};
      observables.push(this._equiposService.updateEquipo(equipo._id,body))
    });

    Observable.forkJoin(observables)
      .subscribe(
        result => {},
        () => console.log('error'),
        () => {
          this.vaciarJugadoresEquipo = false;
          this.loadData();
        }
      )
  };

  borrarDatos = function () {
    this.listadoequipos = [];
    this.listadojugadores = [];
    this.listadojugadoresSeleccionables = [];
    this.listadoEquiposSeleccionables = [];
    this.equipoSelector = {};
  }

  ngOnInit() {
    this.loadData()
  }

}
