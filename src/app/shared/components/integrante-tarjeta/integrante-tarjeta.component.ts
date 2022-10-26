import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarComponent } from '../confirmar/confirmar.component';
import { MatDialog } from '@angular/material/dialog';
import { IntegranteService } from '../../services/integrante.service';

@Component({
  selector: 'app-integrante-tarjeta',
  templateUrl: './integrante-tarjeta.component.html',
  styleUrls: ['./integrante-tarjeta.component.scss']
})
export class IntegranteTarjetaComponent implements OnInit {

  repertorioPorId:any=localStorage.getItem('repertorioPorId');
  @Input() integrante!: any ;

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private integranteService: IntegranteService,
  ) { }

  ngOnInit(): void {

  }


  borrarUsuario(deleteme:any) {
    const dialog=this.dialog.open(ConfirmarComponent,{
      width:'30%',  
      
      data:{...this.integrante}
    })

    dialog.afterClosed().subscribe(
      (result)=>{
        if(result){
          this.integranteService.actualizarIntegranteRepertorio(this.repertorioPorId)
            .subscribe(resp=>{
              console.log("DELETE TS",resp);
              window.location.reload();
              this.mostrarSnackBar("Usuario Eliminado")
            });
        }
      }
    );
  }

  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, '!Ok', {
      duration: 2000,
    });
  }

}
