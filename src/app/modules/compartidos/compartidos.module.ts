import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCompartidosComponent } from './pages/listar-compartidos/listar-compartidos.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';



@NgModule({
  declarations: [
    ListarCompartidosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    
  ],
  exports: [
    ListarCompartidosComponent
  ]
})
export class CompartidosModule { }
