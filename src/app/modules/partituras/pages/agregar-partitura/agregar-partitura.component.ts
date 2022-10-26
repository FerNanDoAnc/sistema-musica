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
  public fileTmp:any;
  nombreFile:any [] =[];
  constructor(
    public dialogRef: MatDialogRef<CrearPartituraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

    private uploadService: UploadService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if(this.data?.content?.hasOwnProperty('_id')){
      this.cancion=this.data.content;
    }
  }
  // ===========================================================================
  // *************************  UPLOAD FILE  ***********************************
  // ===========================================================================
  
  onFileChange(event:any){
    const [file] = event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file.name,
    }
    this.nombreFile=[]
    this.nombreFile.push(this.fileTmp.fileName);
    console.log("nombreFile",this.nombreFile);
  }

  onUpload(){
    
    const cancion= new FormData();
    cancion.append('archivo',this.fileTmp.fileRaw);
    cancion.append('_id',this.cancion._id);

    this.uploadService.actualizarCanPartitura(cancion)
      .subscribe(resp=>{
        this.dialogRef.close();
        window.location.reload();
        
      })

    // PARA VARIOS PDF
    // let formData = new FormData();
    // for(let i=0;i< this.archivo.length; i++){
    //   formData.append(
    //     "uploads[]", 
    //     this.archivo[i], 
    //     this.archivo[i].name)
    // }

    // const unoD = formData.getAll("uploads");
    // const uploadData =  unoD[0];
    // this.cancion.archivo = uploadData;
    // console.log("uploadData",uploadData);
    // Service
    // this.uploadService.actualizarCanPartitura(this.cancion)
    //   .subscribe(
    //     (res)=>{
    //       console.log("res",res);
    //       // this.partitura.archivo = res.nombreArchivo;
    //       // this.CrearPartitura();
    //     },
    //     (err)=>{
    //       console.log("err",err);
    //     }
    //   );

  }

  // ===========================================================================

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
