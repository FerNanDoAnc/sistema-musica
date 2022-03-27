import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule} from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { RepertoriosModule } from '../repertorios/repertorios.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { CancionesModule } from '../canciones/canciones.module';


@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule,
    RepertoriosModule,
    UsuariosModule,
    CancionesModule,

    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  exports: [
    HomePageComponent,
  ]
})
export class HomeModule { }
