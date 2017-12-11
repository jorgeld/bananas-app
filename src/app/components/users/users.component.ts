import {Component, Input, OnInit} from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers : [UsersService]
})
export class UsersComponent implements OnInit {

  constructor(private _usersService : UsersService) { }

  listadousuarios;

  getUsers = function(){

    this._usersService.getUsersRest()
      .subscribe(
        result => {
          this.listadousuarios = result.users;
        },
        error => {
          console.log(`Error al llamar servicio getUsers()`);
          alert(error);
        }
      )
  };

  ngOnInit() {
    this.getUsers();
  }

}
