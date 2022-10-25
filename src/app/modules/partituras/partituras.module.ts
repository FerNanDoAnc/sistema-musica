import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearPartituraDialogComponent } from './pages/crear-partitura-dialog/crear-partitura-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { AgregarPartituraComponent } from './pages/agregar-partitura/agregar-partitura.component';
import { RouterModule } from '@angular/router';
import { PreviewComponent } from './pages/preview/preview.component';



@NgModule({
  declarations: [
    CrearPartituraDialogComponent,
    AgregarPartituraComponent,
    PreviewComponent
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
    PreviewComponent
  ]
})
export class PartiturasModule { }
