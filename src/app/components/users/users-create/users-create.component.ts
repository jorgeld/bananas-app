import {Component, Input, OnInit} from '@angular/core';
import { UsersService } from '../../users.service';
import { UsersComponent} from '../users.component'

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css'],
  providers: [ UsersService,UsersComponent]
})
export class UsersCreateComponent implements OnInit {

  private nombre;
  private nombreUsuario;
  private email;
  private pass;

  constructor( private _usersService: UsersService, private _usersComponent : UsersComponent) {}

  newUser = function(){

  let bodyParse = {
      'userName' : this.nombreUsuario,
      'name' : this.nombre,
      'email' : this.email,
      'pass' : this.pass,
    };

    this._usersService.newUser(bodyParse)
      .subscribe(
        result => {
          console.log('Usuario creado correctamente --> ' , result.user);
          this._usersComponent.getUsers();
        },
        error => {
          console.log("Error al llamar servicio getUsers()");
          alert(error);
        })
  };

  ngOnInit() {
  }

}
