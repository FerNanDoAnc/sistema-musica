import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RepertorioService } from '../../../../shared/services/repertorio.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  repertorios: any [] = [];
  repertorioSeleccionado : any | undefined;

  constructor(
    private repertoriosService: RepertorioService
  
  ) { }

  ngOnInit(): void {
  }

  buscando(){
    this.repertoriosService.getSugerencias(this.termino.trim())
      .subscribe( repertorio => this.repertorios=repertorio);
  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){
    
    if(!event.option.value){
      this.repertorioSeleccionado = undefined;
      return;
    }

    const repertorio:any = event.option.value;
    this.termino = repertorio.nombre;

    this.repertoriosService.getRepertorioPorId(repertorio._id!)
    .subscribe( repertorio => this.repertorioSeleccionado = repertorio);
  }

}
