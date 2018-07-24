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
import { EquiposComponent } from './components/equipos/equipos.component';
import { AmistososComponent } from './components/amistosos/amistosos.component';
import { TorneosComponent } from './components/torneos/torneos.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { LigaComponent } from './components/liga/liga.component';
import { JornadaComponent } from './components/liga/jornada/jornada.component';
import { PartidoComponent } from './components/liga/jornada/partido/partido.component';
import { ClasificacionComponent } from './components/liga/clasificacion/clasificacion.component';

const appRoutes: Routes = [
  { path: 'usuarios', component: UsersComponent },
  { path: 'monkeys', component: MonkeysComponent },
  { path: 'draft', component: DraftComponent },
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'amistosos', component: AmistososComponent },
  { path: 'torneos', component: TorneosComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: 'liga', component: LigaComponent },
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
    EquiposComponent,
    AmistososComponent,
    TorneosComponent,
    HistoricoComponent,
    LigaComponent,
    JornadaComponent,
    PartidoComponent,
    ClasificacionComponent,
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
