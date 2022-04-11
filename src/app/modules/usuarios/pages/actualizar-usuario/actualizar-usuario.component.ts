import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { UploadService } from '../../../../shared/services/upload.service';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.scss']
})
export class ActualizarUsuarioComponent implements OnInit {

  imageSrc!: string;
  private fileTmp:any;
  idLocal:any=localStorage.getItem('_id');
  // usuario : Usuario[] = [];

  usuario: any= {
    nombre:'',
    correo:'',
  }

  constructor(
    private usuarioService:UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {
    if(!this.router.url.includes('editar')){
      return
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({uid})=>this.usuarioService.getUsuarioPorId(uid))
      )
      .subscribe(usuario=>this.usuario=usuario);
  }

  guardar(){
    // if(this.usuario.nombre.trim().length === 0){
    //   return;
    // }
    this.onUpload();
    if(this.usuario.uid){
      // Actualizar
      this.usuarioService.actualizarUsuario(this.usuario)
        .subscribe(resp=>{
          console.log("actuUsuarioguardar",resp);
          this.mostrarSnackBar("Usuario actualizado")
          this.router.navigate(['/home/usuario']);
        });

      
    }

  }

  // Mostrar snackbar
  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, '!Ok', {
      duration: 2000,
    });
  }
  volver(){
    this.router.navigate(['/home/usuario']);
  }

  // ================================0PERFIL=====================================
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
    
    const usuario= new FormData();
    usuario.append('archivo',this.fileTmp.fileRaw);
    usuario.append('uid',this.usuario.uid);
    this.uploadService.actualizarUsuarioPerfil(usuario)
      .subscribe(resp=>{
        console.log("onUpload",resp);
        // window.location.reload();
      })


  }
  
}
