import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddListIntegrantesDialogComponent } from './pages/add-list-integrantes-dialog/add-list-integrantes-dialog.component';
import { AddListIntegrantesComponent } from './pages/add-list-integrantes/add-list-integrantes.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';



@NgModule({
  declarations: [
    AddListIntegrantesDialogComponent,
    AddListIntegrantesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    AddListIntegrantesDialogComponent,
    AddListIntegrantesDialogComponent
  ],
})
export class IntegrantesModule { }
