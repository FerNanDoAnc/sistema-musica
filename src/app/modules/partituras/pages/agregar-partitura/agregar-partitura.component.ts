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
  // partitura={
  //   archivo:'',
  // };
  private fileTmp:any;
  archivo!:Array<File>;
  // uploadedFiles: File[] = [];
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
  }

  onUpload(){
    
    const cancion= new FormData();
    cancion.append('archivo',this.fileTmp.fileRaw);
    cancion.append('_id',this.cancion._id);
    // this.cancion.archivo =body;

    this.uploadService.actualizarCanPartitura(cancion)
      .subscribe(resp=>{
        this.dialogRef.close();
        
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

  CrearPartitura(){

    this.uploadService.actualizarCanPartitura(this.cancion)
      .subscribe(resp=>{
        console.log("CrearPartitura",resp);
        this.mostrarSnackBar("Partitura Creada")
        this.dialogRef.close();
        window.location.reload();
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
