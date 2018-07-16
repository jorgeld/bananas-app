import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
  inputs:['equipoLocal','equipoVisitante'],
})
export class PartidoComponent implements OnInit {

  constructor() { }

  @Input() equipoLocal: string;
  @Input() equipoVisitante: string;

  ngOnInit() {
  }

}
