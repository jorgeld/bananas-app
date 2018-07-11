import { Component, OnInit } from '@angular/core';
import {HistoricoService} from "./historico.service"

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
  providers:[HistoricoService]
})
export class HistoricoComponent implements OnInit {

  constructor(private _historicoService: HistoricoService,) { }

  torneos = [];

  ngOnInit() {
    this._historicoService.getHistoricoTorneos()
      .subscribe(
        res => {
          this.torneos = res.torneo;
        },
        error => {

        }
      )
  }

}
