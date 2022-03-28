import { Component, OnInit, Input, Inject } from '@angular/core';
import { CrearPartituraDialogComponent } from '../crear-partitura-dialog/crear-partitura-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../../../../shared/services/upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-partitura',
  templateUrl: './agregar-partitura.component.html',
  styleUrls: ['./agregar-partitura.component.scss']
})
export class AgregarPartituraComponent implements OnInit {

  @Input() cancion!: any ;
  partitura={
    archivo:null,
  };
  constructor(
    public dialogRef: MatDialogRef<CrearPartituraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

    private uploadService: UploadService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if(this.data?.content?.hasOwnProperty('_id')){
      this.cancion=this.data.content;
      console.log("NEW PARTITURA TS",this.cancion);
    }
  }

  CrearPartitura(){

    this.uploadService.actualizarCanPartitura(this.cancion)
      .subscribe(resp=>{
        console.log("CrearPartitura",resp);
        this.mostrarSnackBar("Partitura Creada")
        this.dialogRef.close();
      });
  }

  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, '!Ok', {
      duration: 2000,
    });
  }
  volver(){
    // this.router.navigate(['/home/repertorios']);
    window.history.back();
  }
  
}
