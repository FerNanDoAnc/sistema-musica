import { Component, OnInit } from '@angular/core';
import { Repertorio } from '../../../../core/interfaces/repertorio.interface';
import { RepertorioService } from '../../../../shared/services/repertorio.service';

@Component({
  selector: 'app-listado-repertorios',
  templateUrl: './listado-repertorios.component.html',
  styleUrls: ['./listado-repertorios.component.scss']
})
export class ListadoRepertoriosComponent implements OnInit {

  idLocal:any=localStorage.getItem('_id');
  
  // repertorios! : any;
  repertorios:any[]=[];
  // repertorios:any=[];
  constructor(
    private repertoriosService: RepertorioService
  ) { }

  ngOnInit(): void {
    this.getRepertoriosList();
  }
  getRepertoriosList(){
    this.repertoriosService.getRepertorioPorUsuario(this.idLocal)
    .subscribe(
      repertorios=>{
        this.repertorios=repertorios;
        console.log("repertorios Por wqqweewq",repertorios);
      },
      err=>console.log(err)
    );
  }
}
