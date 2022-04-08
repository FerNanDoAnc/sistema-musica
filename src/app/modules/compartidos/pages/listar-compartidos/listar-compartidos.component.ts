import { Component, OnInit } from '@angular/core';
import { CompartidoService } from '../../../../shared/services/compartido.service';

@Component({
  selector: 'app-listar-compartidos',
  templateUrl: './listar-compartidos.component.html',
  styleUrls: ['./listar-compartidos.component.scss']
})
export class ListarCompartidosComponent implements OnInit {

  correoLocal:any=localStorage.getItem('correo');

  compartidos:any[] =[];

  constructor(
    private compartidoService: CompartidoService,

  ) { }

  ngOnInit(): void {
    this.getRepertoriosList();
  }

  getRepertoriosList(){
    this.compartidoService.getRepertorioPorCompartido(this.correoLocal)
    .subscribe(
      compartidos=>{
        this.compartidos=compartidos;
        console.log("COMPARTIDO TS",this.compartidos);
      },
      err=>console.log(err)
    );
  }

}
