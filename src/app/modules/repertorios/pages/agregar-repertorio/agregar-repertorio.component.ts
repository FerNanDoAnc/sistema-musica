import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RepertorioService } from '../../../../shared/services/repertorio.service';
import { ConfirmarComponent } from '../../../../shared/components/confirmar/confirmar.component';
import { UploadService } from '../../../../shared/services/upload.service';

@Component({
  selector: 'app-agregar-repertorio',
  templateUrl: './agregar-repertorio.component.html',
  styleUrls: ['./agregar-repertorio.component.scss']
})
export class AgregarRepertorioComponent implements OnInit {

  idLocal:any=localStorage.getItem('_id');
  imageSrc!: string;
  imgDefault:string = '../../../../../assets/imagen-modulos/back-repert.jpg';

  private fileTmp:any;

  repertorio: any= {
    nombre:'',
    usuario:this.idLocal,
  }

  constructor(
    private repertoriosService:RepertorioService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {
    console.log("repertorio",this.repertorio);
    if(!this.router.url.includes('editar')){
      return
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({_id})=>this.repertoriosService.getRepertorioPorId(_id))
      )
      .subscribe(repertorio=>this.repertorio=repertorio);

  }

  onFileChange(event:any){
    const [file] = event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file.name,
    }

    // PREVIEW
    this.imageSrc = file.name;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onUpload(){
    
    const repertorio= new FormData();
    repertorio.append('archivo',this.fileTmp.fileRaw);
    repertorio.append('_id',this.repertorio._id);
    
    this.uploadService.actualizarRepertorioPerfil(repertorio)
      .subscribe(resp=>{
        console.log("REPERTORIO ACTU",resp);
        window.location.reload();
      })


  }
  guardar(){
    // if(this.repertorio.nombre.trim().length === 0){
    //   return;
    // }

    if(this.repertorio._id){
      // Actualizar
      this.repertoriosService.actualizarRepertorio(this.repertorio)
        .subscribe(resp=>{
          this.mostrarSnackBar("Registro actualizado")
          this.router.navigate(['/home/repertorios']);
        });

      this.onUpload();
    }
    else{ 
      // Crear
      this.repertoriosService.agregarRepertorio(this.repertorio).
      subscribe(repertorio=>{
        console.log("repertorio=",repertorio);
        // this.router.navigate(['/home/repertorios/editar',repertorio._id]);
        this.mostrarSnackBar("Registro Creado");
        this.router.navigate(['/home/repertorios']);
      })
    }
  }

  borrarRepertorio(){
    const dialog=this.dialog.open(ConfirmarComponent,{
      width:'30%',
      data:{...this.repertorio}
    })

    dialog.afterClosed().subscribe(
      (result)=>{
        if(result){
          this.repertoriosService.borrarRepertorio(this.repertorio._id!)
            .subscribe(resp=>{
              this.mostrarSnackBar("Registro borrado");
              this.router.navigate(['/home/repertorios']);
            })
        }
      }
    );
    
  }

  // Mostrar snackbar
  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, '!Ok', {
      duration: 2000,
    });
  }
  volver(){
    this.router.navigate(['/home/repertorios']);
  }

}
