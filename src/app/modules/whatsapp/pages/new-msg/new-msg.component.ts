import { Component, OnInit } from '@angular/core';
import { WhatsappService } from '../../../../shared/services/whatsapp.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { NewMsgDialogComponent } from '../new-msg-dialog/new-msg-dialog.component';

@Component({
  selector: 'app-new-msg',
  templateUrl: './new-msg.component.html',
  styleUrls: ['./new-msg.component.scss']
})
export class NewMsgComponent implements OnInit {
  title = 'Proyecto Whatsapp';
  mensajeForm:any;

  respuesta:any={};

  constructor(private whatsappSvc:WhatsappService, 
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<NewMsgDialogComponent>) {

    this.mensajeForm = fb.group({
      phone:['51', [Validators.required]],
      message:['', [Validators.required]],
    })  
  }

  ngOnInit(): void {
  }

  enviarWhatsapp(){
    if (this.mensajeForm.value.phone && this.mensajeForm.value.message ) {
      let mensaje={
        message:this.mensajeForm.value.message,
        phone:this.mensajeForm.value.phone
      }
      this.whatsappSvc.enviarMensaje(mensaje).subscribe(res=>{
        this.respuesta = res
        console.log(this.respuesta.responseExSave.error)
        
        if (this.respuesta.responseExSave.error === 'WAIT_LOGIN') {
          Swal.fire('ERROR', 'Debe escanear el codigo QR', 'error');              
        }else if(this.respuesta.responseExSave.error === 'Protocol error (Runtime.callFunctionOn): Session closed. Most likely the page has been closed.'){
         
         Swal.fire('ERROR', 'Se cerro la sesion', 'error');
         this.mensajeForm.reset();

        }else{
         Swal.fire('Exito', 'Mensaje enviado', 'success');
         this.mensajeForm.reset();
        }

      });
    }else{
      Swal.fire('ERROR', 'Debe llenar todos los campos', 'error');
    } 
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
