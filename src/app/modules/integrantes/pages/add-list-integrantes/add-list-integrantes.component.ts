import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddListIntegrantesDialogComponent } from '../add-list-integrantes-dialog/add-list-integrantes-dialog.component';
import { IntegranteService } from '../../../../shared/services/integrante.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    nombre: this.data.content.nombre,
    usuario:this.idLocal,
  }
  
  constructor(
    public dialogRef: MatDialogRef<AddListIntegrantesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

    private repertoriosService: IntegranteService,
    private snackBar: MatSnackBar,
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
    
    console.log("CUD TS",this.corInt);
  }
  
  cudIntegrantes(){
    this.repertoriosService.actualizarIntegranteRepertorio(this.corInt)
    .subscribe(resp=>{
      console.log("CUD TS",resp);
      this.mostrarSnackBar("Registro actualizado")
      // this.router.navigate(['/home/repertorios']);
    });
  }

  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, '!Ok', {
      duration: 2000,
    });
  }
}
