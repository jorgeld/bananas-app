import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css'],
  inputs:['numJornada','jornada'],
  providers : [DataService]
})

export class JornadaComponent implements OnInit {

  constructor(private data: DataService) { }

  @Input() numJornada:number;
  @Input() jornada:any;
  @Output() public datosClasificacion = new EventEmitter();

  message:string;

  public enviandoResultadoPartido(param){
    this.recibiendoDatosPartido(param)
  }

  public recibiendoDatosPartido(param){
    this.datosClasificacion.emit(param);
  }

  ngOnInit() {
  }

}
