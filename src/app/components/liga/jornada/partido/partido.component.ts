import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
  inputs:['equipoLocal','equipoVisitante','marcador'],
})
export class PartidoComponent implements OnInit {

  constructor() { }

  @Input() equipoLocal: object;
  @Input() equipoVisitante: object;
  @Input() marcador: any;

  playGame = () => {
    this.marcador = '32-65'
  };

  ngOnInit() {
  }

}
