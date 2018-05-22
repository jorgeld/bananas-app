import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importamos el módulo http del paquete http de Angular
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsersComponent } from './components/users/users.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UsersCreateComponent } from './components/users/users-create/users-create.component';
import { Routes , RouterModule} from "@angular/router";
import { MonkeysComponent } from './components/monkeys/monkeys.component';
import { DraftComponent } from './components/draft/draft.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { FiltroPosicionPipe } from './pipes/filtro-posicion.pipe';

const appRoutes: Routes = [
  { path: 'usuarios', component: UsersComponent },
  { path: 'monkeys', component: MonkeysComponent },
  { path: 'equipos', component: DraftComponent },
  { path: 'jugadores', component: JugadoresComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    UsersListComponent,
    UsersCreateComponent,
    UsersComponent,
    MonkeysComponent,
    DraftComponent,
    JugadoresComponent,
    FiltroPosicionPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
