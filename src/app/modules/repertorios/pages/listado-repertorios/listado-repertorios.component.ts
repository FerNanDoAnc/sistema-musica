import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Repertorio } from '../../../../core/interfaces/repertorio.interface';
import { RepertorioService } from '../../../../shared/services/repertorio.service';

@Component({
  selector: 'app-listado-repertorios',
  templateUrl: './listado-repertorios.component.html',
  styleUrls: ['./listado-repertorios.component.scss']
})
export class ListadoRepertoriosComponent implements OnInit {

  idLocal:any=localStorage.getItem('_id');
  
  repertorios:any[]=[]; 


  constructor(
    private repertoriosService: RepertorioService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getRepertoriosList();
  }
  
  get usuario(){
    return this.primerNombre(this.authService.usuario.nombre);
  }
  primerNombre(nombre:string){
    return nombre.split(' ')[0];
  }

  getRepertoriosList(){
    this.repertoriosService.getRepertorioPorUsuario(this.idLocal)
    .subscribe(
      repertorios=>{
        this.repertorios=repertorios;
      },
      err=>console.log(err)
    );
  }
  // --------------------------------------------------------------
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}
