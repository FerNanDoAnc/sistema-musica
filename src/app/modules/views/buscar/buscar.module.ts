import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { BuscarComponent } from './buscar.component';
import { BuscarRoutingModule } from './buscar-routing.module';


@NgModule({
  declarations: [
    BuscarComponent
  ],
  imports: [
    CommonModule,
    BuscarRoutingModule,
    MaterialModule
  ]
})
export class BuscarModule { }
