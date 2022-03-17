import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepertoriosRoutingModule } from './repertorios-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RepertoriosComponent } from './repertorios.component';
import { AgregarRepertorioComponent } from './agregar-repertorio/agregar-repertorio.component';
import { RepertorioTarjetaComponent } from '../../../shared/components/repertorio-tarjeta/repertorio-tarjeta.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    RepertoriosComponent,
    AgregarRepertorioComponent
  ],
  imports: [
    CommonModule,
    RepertoriosRoutingModule,
    MaterialModule,
    SharedModule,
    // RepertorioTarjetaComponent
  ]
})
export class RepertoriosModule { }
