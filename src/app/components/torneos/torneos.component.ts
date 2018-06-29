import { Component, OnInit } from '@angular/core';
import { EquiposService} from "../equipos/equipos.service";

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css'],
  providers:[ EquiposService ]
})
export class TorneosComponent implements OnInit {

  constructor(private _equiposService: EquiposService) { }

  equipoList = [];
  numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  torneo = {
    octavos : {
      eliminatorias : []
    },
    cuartos : {},
    semifinales : {},
    final : {},
  };

  getEquiposList = () => {
    this._equiposService.getEquiposRest()
      .subscribe(
        res =>{
          this.equipoList = res.equipos;
          this.rellenarTorneo();
        },
        error =>{}
      )
  };

  rellenarTorneo = () => {

   while(this.numbers.length > 0){
        let equipoAleatorio1 = this.equipoList[this.seleccionAleatoria()];
        let equipoAleatorio2 = this.equipoList[this.seleccionAleatoria()];
        let eliminatoria = {
          equipo1 : equipoAleatorio1,
          equipo2 :equipoAleatorio2,
          ronda:1,
          partidos : [
            {
              resultado : 0,
              ganador:'',
            }
          ],
          estadoEliminatoria : {
            victoriasEquipo1 : 0,
            victoriasEquipo2 : 0,
          },
          ganador : null
        };

        this.torneo.octavos.eliminatorias.push(eliminatoria)
      }

    console.log(' ----> torneo ---> ' , this.torneo)

  };

  seleccionAleatoria = () => {

     let num = Math.floor((Math.random() * (this.numbers.length)));
     let res = this.numbers[num];
     this.numbers.splice(num,1);
     return res;
  };

  ngOnInit() {
    this.getEquiposList()
  }

}
