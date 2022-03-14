import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepertoriosRoutingModule } from './repertorios-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RepertoriosComponent } from './repertorios.component';
import { AgregarRepertorioComponent } from './agregar-repertorio/agregar-repertorio.component';

@NgModule({
  declarations: [
    RepertoriosComponent,
    AgregarRepertorioComponent
  ],
  imports: [
    CommonModule,
    RepertoriosRoutingModule,
    MaterialModule
  ]
})
export class RepertoriosModule { }
