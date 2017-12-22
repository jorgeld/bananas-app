import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../equipos/equipos.service';
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
  providers : [EquiposService]
})
export class EquiposComponent implements OnInit {

  constructor(private _equiposService: EquiposService, private _appComponent: AppComponent) { }

  listadoequipos = [];
  comunidades = ["Andalucía", "Aragón", "Canarias", "Cantabria", "Castilla y León", "Castilla-La Mancha", "Cataluña", "Ceuta", "Comunidad Valenciana", "Comunidad de Madrid", "Extremadura", "Galicia", "Islas Baleares", "La Rioja", "Melilla", "Navarra", "País Vasco", "Principado de Asturias", "Región de Murcia" , "Andorra"]
  comunidadElegida = '';

  getEquipos = function(){
    this._equiposService.getEquiposRest()
      .subscribe(
        result => {
          this.listadoequipos = result.equipos;
        },
        error => {
          console.log(`Error al llamar servicio getEquipos()`);
          alert(error);
        }
      )
  };

  generateEquipos = function(){
    var self = this;
    this.comunidades.forEach(function(comunidad){
     let body = { 'name' : comunidad};
      self._equiposService.newEquipo(body)
       .subscribe(
         result => {
           console.log('EQUIPO CREADO ----> ' ,result)
         },
         error => {
           console.log(`Error al llamar servicio newEquipo()`);
           alert(error);
         }
       )
    })

    this.getEquipos();
  };

  ngOnInit() {
    this.getEquipos();
  }

}
