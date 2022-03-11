import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepertoriosRoutingModule } from './repertorios-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RepertoriosRoutingModule,
    MaterialModule
  ]
})
export class RepertoriosModule { }
