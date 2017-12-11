import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UsersService } from '../../users.service';
import { AppComponent } from '../../../app.component'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [ UsersService ,AppComponent]
})

export class UsersListComponent implements OnInit {

  @Input('listadousuarios') listadousuarios;

  constructor(private _usersService: UsersService, private _appComponent: AppComponent) {}

  deleteUser = function(idUser,index){
    this._usersService.deleteUser(idUser)
      .subscribe(
        result =>{
          this.listadousuarios.splice(index,1);
          console.log(`Borrado correctamente : ${result}`)
        },
        error => {
          console.log(`Error al eliminar Usuario ----> ${error}`);
          alert(error);
        }
      )
  };

  abirModalCreacion = function(){

  };

  ngOnInit() {
  }


}
