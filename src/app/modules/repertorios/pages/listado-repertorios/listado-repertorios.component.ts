import { Component, OnInit } from '@angular/core';
import { Repertorio } from '../../../../core/interfaces/repertorio.interface';
import { RepertorioService } from '../../../../shared/services/repertorio.service';

@Component({
  selector: 'app-listado-repertorios',
  templateUrl: './listado-repertorios.component.html',
  styleUrls: ['./listado-repertorios.component.scss']
})
export class ListadoRepertoriosComponent implements OnInit {

  repertorios:Repertorio[]=[];
  // repertorios:any=[];
  constructor(
    private repertorioService: RepertorioService
  ) { }

  ngOnInit(): void {
    this.getRepertoriosList();
  }
  getRepertoriosList(){
    this.repertorioService.getRepertorios()
    .subscribe(
      repertorios=>{
        this.repertorios=repertorios;
        // const usuariosData=Object.values(this.repertorios);
        // console.log("usuariosData=",usuariosData);
        // const obj = Object.assign({}, repertorios);
        // console.log("obj",obj)}
      },
      err=>console.log(err)
    );
  }
}
