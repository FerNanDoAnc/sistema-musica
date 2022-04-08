import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddListIntegrantesDialogComponent } from '../add-list-integrantes-dialog/add-list-integrantes-dialog.component';
import { IntegranteService } from '../../../../shared/services/integrante.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarComponent } from '../../../../shared/components/confirmar/confirmar.component';

@Component({
  selector: 'app-add-list-integrantes',
  templateUrl: './add-list-integrantes.component.html',
  styleUrls: ['./add-list-integrantes.component.scss']
})
export class AddListIntegrantesComponent implements OnInit {

  idLocal:any=localStorage.getItem('_id');

  repertorios:any[]=[];
  integrantes: any[]=[];  
  correosInte:any []=[];

  corInt: any= {
    _id: this.data.content._id,
    nombre: this.data.content.nombre,
    usuario:this.idLocal,
    integrantes:this.correosInte,
  }
  
  constructor(
    public dialogRef: MatDialogRef<AddListIntegrantesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

    private integranteService: IntegranteService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if(this.data?.content?.hasOwnProperty('_id')){
      this.repertorios=this.data.content;
    }
    this.mostrarIntegrantes();
  }

  mostrarIntegrantes(){    
    // Separar y asignar arreglos
    const inteValue= Object.values(this.repertorios);
    for(let element of inteValue){
      this.integrantes.push(element);
    }

    // Obtener correos de integrantes
    const corr= Object.values(this.integrantes[3]);
    for(let element2 of corr){
      this.correosInte.push(element2);
    }
    
  }
  
  cudIntegrantes(){
    this.integranteService.actualizarIntegranteRepertorio(this.corInt)
    .subscribe(resp=>{
      window.location.reload();
      this.mostrarSnackBar("Usuario Agregado")
      // this.router.navigate(['/home/repertorios']);
    });
  }
  
  borrarUsuario(deleteme:any) {
    const dialog=this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data:{...this.corInt}
    })

    dialog.afterClosed().subscribe(
      (result)=>{
        if(result){

          this.corInt.integrantes.splice(deleteme,1);
          this.integranteService.actualizarIntegranteRepertorio(this.corInt)
            .subscribe(resp=>{
              window.location.reload();
              this.mostrarSnackBar("Usuario Eliminado")
            });

        }
      }
    );
  }

  onclick(prouser:any){
    this.corInt.integrantes.push({correo:prouser.value});
    prouser.value='';

    this.cudIntegrantes();
  }

  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, '!Ok', {
      duration: 2000,
    });
  }
}
