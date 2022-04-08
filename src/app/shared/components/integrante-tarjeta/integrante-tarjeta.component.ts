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

  @Input() integrante!: any ;

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private integranteService: IntegranteService,
  ) { }

  ngOnInit(): void {
    console.log("REpertorio",this.integrante);
  }

  borrarUsuario() {
    const dialog=this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data:{...this.integrante}
    })

    dialog.afterClosed().subscribe(
      (result)=>{
        if(result){
          this.integranteService.actualizarIntegranteRepertorio(this.integrante.correo)
            .subscribe(resp=>{
              console.log("DELETE TS",resp);
              window.location.reload();
              this.mostrarSnackBar("Usuario Eliminado")
            });
          // this.cancionService.borrarCancion(this.cancion._id!)
          //   .subscribe(resp=>{
          //     window.location.reload();
          //   })
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
