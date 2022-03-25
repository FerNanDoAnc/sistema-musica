import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.scss']
})
export class ActualizarUsuarioComponent implements OnInit {

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
    public dialog: MatDialog
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

    if(this.usuario.uid){
      // Actualizar
      this.usuarioService.actualizarUsuario(this.usuario)
        .subscribe(resp=>{
          console.log("actu",resp);
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


}
