import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepertorioTarjetaComponent } from './components/repertorio-tarjeta/repertorio-tarjeta.component';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    RepertorioTarjetaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    RepertorioTarjetaComponent
  ]
})
export class SharedModule { }
