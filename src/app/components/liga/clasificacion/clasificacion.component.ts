import {Component, Input, OnInit} from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css'],
  providers:[DataService]
})
export class ClasificacionComponent implements OnInit {

  constructor(private data: DataService) {}

  message:any;

  ngOnInit() {

  }

}
