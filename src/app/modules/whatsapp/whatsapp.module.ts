import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMsgDialogComponent } from './pages/new-msg-dialog/new-msg-dialog.component';
import { NewMsgComponent } from './pages/new-msg/new-msg.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    NewMsgDialogComponent,
    NewMsgComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
  ],
  exports:[
    NewMsgDialogComponent,
    NewMsgComponent
  ]
})
export class WhatsappModule { }
