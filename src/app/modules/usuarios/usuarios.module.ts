import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarUsuarioComponent } from './pages/listar-usuario/listar-usuario.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ActualizarUsuarioComponent } from './pages/actualizar-usuario/actualizar-usuario.component';



@NgModule({
  declarations: [
    ListarUsuarioComponent,
    ActualizarUsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    ListarUsuarioComponent,
    ActualizarUsuarioComponent
  ]
})
export class UsuariosModule { }
