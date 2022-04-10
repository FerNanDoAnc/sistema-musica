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

    // RECORRER Y SACAR DE REPERTORIOS
    const pushear=[];
    let pushear2:any=[];
    const inteKey= Object.keys(this.repertorios);
    const inteValues= Object.values(this.repertorios);
    for(let element of inteKey){
      pushear.push(element)
    }
    pushear.map((element,index)=>{
      if(element==='integrantes'){
        pushear2=inteValues[index];
      }
    });

    // RECORRER Y SCAR DE INTEGRANTES
    let pushear3 =[];
    let pushear4:any=[];
    const inteKey2= Object.keys(pushear2);
    const inteValues2= Object.values(pushear2);
    for(let element2 of inteKey2){
      pushear3.push(element2)
    }
    pushear3.map((element,index)=>{
      this.correosInte.push(inteValues2[index])
    });
    console.log(this.correosInte);

  }
  
  cudIntegrantes(){
    this.integranteService.actualizarIntegranteRepertorio(this.corInt)
    .subscribe(resp=>{
      // window.location.reload();
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
              // window.location.reload();
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
