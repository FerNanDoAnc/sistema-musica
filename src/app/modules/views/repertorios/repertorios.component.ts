import { Component, OnInit } from '@angular/core';
import { RepertorioService } from '../../../shared/services/repertorio.service';
import { Repertorio } from '../../../core/interfaces/repertorio.interface';

@Component({
  selector: 'app-repertorios',
  templateUrl: './repertorios.component.html',
  styleUrls: ['./repertorios.component.scss']
})
export class RepertoriosComponent implements OnInit {

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
