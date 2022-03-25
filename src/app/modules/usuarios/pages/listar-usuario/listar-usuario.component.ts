import { Component, OnInit } from '@angular/core';
import { UsuarioList,Usuario } from 'src/app/core/interfaces/usuario.interface';
import { UsuarioService } from '../../../../shared/services/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  idLocal:any=localStorage.getItem('_id');
  
  // usuarios! : any;
  // usuarios:UsuarioList={};
  usuarios:Usuario[]=[];

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getUsuarioPerfil();
  }
  getUsuarioPerfil(){
    this.usuarioService.getUsuarioPorId(this.idLocal)
    .subscribe(
      usuarios=>{

        this.usuarios[0]=usuarios;
        console.log("PERFIL",usuarios);
      },
      err=>console.log(err)
    );
  }

}
