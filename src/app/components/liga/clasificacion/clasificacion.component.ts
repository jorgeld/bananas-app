import {Component, Input, OnInit} from '@angular/core';
import { DataService } from "../data.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css'],
  providers:[DataService]
})
export class ClasificacionComponent implements OnInit {

  constructor(private data: DataService) {}

  message:any;

  private m = '';

  ngOnInit() {
    this.data._cm
      .subscribe(
        msg => { this.m = msg },
        error =>{ console.log('Error ---->', error)},
        () => { console.log('completo')})
  }

}
