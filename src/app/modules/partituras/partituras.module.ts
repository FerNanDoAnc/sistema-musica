import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearPartituraDialogComponent } from './pages/crear-partitura-dialog/crear-partitura-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { AgregarPartituraComponent } from './pages/agregar-partitura/agregar-partitura.component';
import { ListarPartituraDialogComponent } from './pages/listar-partitura-dialog/listar-partitura-dialog.component';
import { ListarPartituraComponent } from './pages/listar-partitura/listar-partitura.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CrearPartituraDialogComponent,
    AgregarPartituraComponent,
    ListarPartituraDialogComponent,
    ListarPartituraComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule

  ],
  exports:[
    CrearPartituraDialogComponent,
    AgregarPartituraComponent,
    ListarPartituraDialogComponent,
    ListarPartituraComponent
  ]
})
export class PartiturasModule { }
