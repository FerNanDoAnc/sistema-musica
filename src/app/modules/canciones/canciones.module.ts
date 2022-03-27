import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearCancionDialogComponent } from './crear-cancion-dialog/crear-cancion-dialog.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { AgregarCancionComponent } from './agregar-cancion/agregar-cancion.component';


@NgModule({
  declarations: [
    CrearCancionDialogComponent,
    AgregarCancionComponent
  ],
  imports: [
    CommonModule,
      MaterialModule,
      SharedModule
  ],
  entryComponents: [
    CrearCancionDialogComponent,
    AgregarCancionComponent
  ]
})
export class CancionesModule { }
