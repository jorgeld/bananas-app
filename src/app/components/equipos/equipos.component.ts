import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../equipos/equipos.service';
import { JugadoresService } from '../jugadores/jugadores.service';
import { UtilsService } from '../utils/utils.service';
import { AppComponent } from '../../app.component'
import { Observable } from 'rxjs/Rx';
import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {noUndefined} from "@angular/compiler/src/util";
import {forEach} from "@angular/router/src/utils/collection";

@Pipe({
  name: 'filtroPosicion'
})
@Injectable()
export class FiltroPosicion implements PipeTransform {
  transform(array): any {
    return array.filter(array => array.posicion  === 'PIVOT');
  }
}

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
  generandoEquipos:false;
  eliminandoEquipos:false;
  vaciarJugadoresEquipo:false;
  generadoDraft = false;

  filtros = {
    posicion : ''
  };

  draft = {
    equipos : [],
    jugadores : [],
    rondaDraft : 1,
    seleccion : this.listadoequipos.length,
    equipoSelector : {equipo:undefined,totales:undefined,jugadores:[]},
    completado:false,
  };

  max_p = false;
  max_ap = false;
  max_a = false;
  max_e = false;
  max_b = false;

  loadData = () => {

    //Eliminamos datos pendientes
    this.borrarDatos();

    //Recogemos equipos
    this._equiposService.getEquiposRest()
      .subscribe(
        result => {
          this.listadoequipos = result.equipos;

          if(this.listadoequipos[this.listadoequipos.length-1].jugadores.length == 10){
            this.generadoDraft = true;
          }


          this.draft.seleccion = 0;

          // A cada equipo le ponemos un atributo para reconocer si es seleccionable o no
          this.listadoequipos.map(
            res => {
              if(!res.hasOwnProperty('jugadores')){
                res.jugadores = [];
              }
                res.seleccionable = true;
            }
          );

          //Guardamos los equipos
          this.draft.equipos = this.listadoequipos;

          // Recogemos los jugadores
          this._jugadoresService.getJugadoresRest()
            .subscribe(
              result => {
                this.draft.jugadores = result.jugadores;
                this.listadojugadores = result.jugadores;

                //TODO:Revisar que se actualice el atributo equipo en cada jugador
                // this.listadojugadoresSeleccionables = this.listadojugadores.filter(
                //   jugador => {
                //     return !jugador.team || jugador.team == ''
                //   })
              },
              error => {
                console.log('Error al generar listado de jugadores')
              });

          //Seleccionamos equipo selector
          if (this.draft.rondaDraft === 1) {
            this.draft.equipoSelector.equipo = this.draft.equipos[this.draft.seleccion];
          } else {
            this.draft.completado = true;
          }

        }
      );
  };

  seleccionarJugador  = function(jugador,index){

    var j = jugador;
    j.team = this.draft.equipoSelector.equipo.name;
    // j.jugadorId = jugador._id;

    //Añadimos jugador
    this.draft.equipos[this.draft.seleccion].jugadores.push(j);

    //Borramos jugador de listao
    this.draft.jugadores.splice(index,1);

    if(this.draft.seleccion !== this.listadoequipos.length -1){
      this.draft.seleccion++;
    }else{
      this.draft.seleccion = 0;
      this.draft.rondaDraft++;
    }

    //Elegimos nuevo equipo selector
    this.draft.equipoSelector.equipo = this.draft.equipos[this.draft.seleccion];
    this.max_p = false;
    this.max_ap= false;
    this.max_a = false;
    this.max_e = false;
    this.max_b = false;
    this.draft.equipoSelector.totales = {
      pivot : 0,
      alapivot : 0,
      alero : 0,
      escolta : 0,
      base : 0
    };

    /**
     * En el caso de tener 2 jugadores de una misma posición, se deshabilitarán
     * los jugadores que tengan la misma posición de la que ya se tengan 2.
     *
     * **/
    if(this.draft.equipoSelector.equipo.jugadores.length > 0){
      this.draft.equipoSelector.equipo.jugadores.forEach((jugador)=>{

        switch (jugador.posicion){
          case "PIVOT" :
            this.draft.equipoSelector.totales.pivot++;
            if(this.draft.equipoSelector.totales.pivot == 2){this.max_p = true}
            break;
          case "ALA-PIVOT" :
            this.draft.equipoSelector.totales.alapivot++;
            if(this.draft.equipoSelector.totales.alapivot == 2){this.max_ap = true}
            break;
          case "ALERO" :
            this.draft.equipoSelector.totales.alero++;
            if(this.draft.equipoSelector.totales.alero == 2){this.max_a = true}
            break;
          case "ESCOLTA" :
            this.draft.equipoSelector.totales.escolta++;
            if(this.draft.equipoSelector.totales.escolta == 2){this.max_e = true}
            break;
          case "BASE" :
            this.draft.equipoSelector.totales.base++;
            if(this.draft.equipoSelector.totales.base == 2){this.max_b = true}
            break;
        }
      })
    }
  };

  generateEquipos = function(){


    this._utilsService.getComunidades()
      .subscribe(
        result => {
            this.comunidades = result.data;
            this.generandoEquipos = true;

            this._equiposService.generateAllTeams()
              .subscribe(
                result => {
                  // localStorage.setItem('rondaDraft' , '1')
                  this.loadData();
                },
                error => {`Error al generar equipos`},
                complete => {
                  this.generandoEquipos = false;
                }
              );
          /**
           * Múltiples llamadas asincronas
           * */

          // let observables = [];
          // this.comunidades.forEach((comunidad) => {
          //   let body = { 'name' : comunidad.nombre, 'bandera' : comunidad.bandera, 'escudo' : comunidad.escudo};
          //   observables.push(this._equiposService.newEquipo(body))
          // });
          // Observable.forkJoin(observables)
          //   .subscribe(
          //     result => {localStorage.setItem('rondaDraft' , '1');},
          //     error => {console.log(`Error al llamar servicio newEquipo()`);},
          //     ()=>{
          //       this.generandoEquipos = false;
          //       // this.borrarDatos();
          //       this.loadData();
          //     }
          //   );
        }
      );
  };

  ordenarTabla = function(val){
    switch (val){
      case 'AT' : this.draft.jugadores.sort(function(a,b){
        if(a.atributos.ataque < b.atributos.ataque){
          return 1;
        }
        if(a.atributos.ataque > b.atributos.ataque){
          return -1;
        }
        return 0;
      }) ;break;
      case 'DF' : this.draft.jugadores.sort(function(a,b){
        if(a.atributos.defensa < b.atributos.defensa){
          return 1;
        }
        if(a.atributos.defensa > b.atributos.defensa){
          return -1;
        }
        return 0;
      }) ;break;
      case 'REB' : this.draft.jugadores.sort(function(a,b){
        if(a.atributos.rebotes < b.atributos.rebotes){
          return 1;
        }
        if(a.atributos.rebotes > b.atributos.rebotes){
          return -1;
        }
        return 0;
      }) ;break;
      case 'PAS' : this.draft.jugadores.sort(function(a,b){
        if(a.atributos.pase < b.atributos.pase){
          return 1;
        }
        if(a.atributos.pase > b.atributos.pase){
          return -1;
        }
        return 0;
      }) ;break;
      case 'AGV' : this.draft.jugadores.sort(function(a,b){
        if(a.atributos.agresividad < b.atributos.agresividad){
          return 1;
        }
        if(a.atributos.agresividad > b.atributos.agresividad){
          return -1;
        }
        return 0;
      }) ;break;
      case 'SEX' : this.draft.jugadores.sort(function(a,b){
        if(a.atributos.sexualidad < b.atributos.sexualidad){
          return 1;
        }
        if(a.atributos.sexualidad > b.atributos.sexualidad){
          return -1;
        }
        return 0;
      }) ;break;
    }
  };

  eliminarEquipos = function(){

    // let observables = [];
    this.eliminandoEquipos = true;

    this._equiposService.deleteAllEquipos()
      .subscribe(
        result => {
          this.eliminandoEquipos = false;
          // this.loadData();
        },
        err => {},
        complete => {}
      )



    // this.listadoequipos.forEach((equipo)=>{
    //   observables.push(this._equiposService.deleteEquipo(equipo._id))
    // });

    // Observable.forkJoin(observables)
    //   .subscribe(
    //     result => {},
    //     () => console.log('error'),
    //     () => {
    //       localStorage.removeItem('rondaDraft');
    //       this.eliminandoEquipos = false;
    //       this.loadData();
    //     }
    //   )
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

  guardarDraft = function(){

    this.draft.guardandoDraft=true;
    let observables = [];

    this.draft.equipos.forEach((equipo) => {
      observables.push(this._equiposService.updateEquipo(equipo._id,equipo))
    });

    Observable.forkJoin(observables)
      .subscribe(
        result => {},
        () => console.log('error'),
        () => {
          this.draft.guardandoDraft=false;
          this._jugadoresService.deleteAllJugador()
            .subscribe(result => {
              this.generadoDraft = true;
              this.loadData();
            })
        }
      )

  };

  borrarDatos = function () {
    this.listadoequipos = [];
    this.listadojugadores = [];
    this.listadojugadoresSeleccionables = [];
    this.listadoEquiposSeleccionables = [];
    this.equipoSelector = {};
  };

  filterPosition = function(data){
    alert('hello! ' + data)
  };

  ngOnInit() {
    this.loadData()
  }

}
