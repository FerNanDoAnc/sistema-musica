import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  idLocal:any=localStorage.getItem('_id');
  usuarios:any={};
  get usuario(){
    return this.authService.usuario;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.getUsuarioPerfil();
  }

  perfil(){
    this.router.navigateByUrl('/home/usuario');
  }
  getUsuarioPerfil(){
    this.usuarioService.getUsuarioPorId(this.idLocal)
    .subscribe(
      usuarios=>{
        this.usuarios =usuarios;
      },
      err=>console.log(err)
    );
  }

  logout(){
    this.router.navigateByUrl('/auth/login');
    this.authService.logout();
  }
}
