import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css'],
  inputs:['numJornada','jornada'],
})
export class JornadaComponent implements OnInit {

  constructor() { }

  @Input() numJornada:number;
  @Input() jornada:any;

  ngOnInit() {
  }

}
