import {Component, Input, OnInit} from '@angular/core';
import { DataService } from "../data.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit {

  constructor(private data: DataService) {}

  message:any;

  ngOnInit() {
    this.data._cm
      .subscribe(
        res => this.message = res,
        err => console.log(err),
        () => console.log('completo')
      );
  }

}
