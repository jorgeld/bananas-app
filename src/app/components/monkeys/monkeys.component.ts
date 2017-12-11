import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MonkeysService } from '../monkeys/monkeys.service';
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-monkeys',
  templateUrl: './monkeys.component.html',
  styleUrls: ['./monkeys.component.css'],
  providers : [MonkeysService]
})

export class MonkeysComponent implements OnInit {

  constructor(private _monkeysService: MonkeysService, private _appComponent: AppComponent) { }

  listadomonkeys;

  getMonkeys = function(){
    this._monkeysService.getMonkeysRest()
      .subscribe(
        result => {
          this.listadomonkeys = result.monkeys;
        },
        error => {
          console.log(`Error al llamar servicio getMonkeys()`);
          alert(error);
        }
      )
  };

  deleteMonkey = function(idMonkey){
    this._monkeysService.deleteMonkey(idMonkey)
      .subscribe(
        result =>{
          console.log(`Borrado correctamente : ${result}`);
          this.getMonkeys();
        },
        error => {
          console.log(`Error al eliminar mono ----> ${error}`);
          alert(error);
        }
      )
  };

  newMonkey = function(){
    this._monkeysService.newMonkey()
      .subscribe(
        result =>{
          console.log(`Creado correctamente : ${result}`);
          this.getMonkeys();
        },
        error => {
          console.log(`Error al crear mono ----> ${error}`);
          alert(error);
        }
      )
  };

  putBanana = function(idMonkey,index){
    this._monkeysService.giveBanana(idMonkey)
      .subscribe(
        result =>{
          console.log(`Alimentando correctamente : ${result}`);
          this.getMonkeys();
        },
        error => {
          console.log(`Error al alimentar mono ----> ${error}`);
          alert(error);
        }
      )
  };

  ngOnInit() {
    this.getMonkeys()
  }

}
