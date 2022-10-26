import { Component, OnInit } from '@angular/core';
import { CompartidoService } from '../../../../shared/services/compartido.service';

@Component({
  selector: 'app-listar-compartidos',
  templateUrl: './listar-compartidos.component.html',
  styleUrls: ['./listar-compartidos.component.scss']
})
export class ListarCompartidosComponent implements OnInit {

  correoLocal:any=localStorage.getItem('correo');
  idLocal:any=localStorage.getItem('_id'); 

  usuarioRepComp:any[]=[];
  mostrarBotones:boolean=false;

  capturarCorreoBackend:any[]=[];
  separarCorreos:any =[];

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
        this.capturarCorreoBackend=compartidos;
        const inteValue= Object.values(this.capturarCorreoBackend[0]);
        for(let element of inteValue){
          this.separarCorreos.push(element);
        }
        this.compartidos=this.separarCorreos;

        // mostrar botones si id es igual
        for(let i of this.separarCorreos){
          this.usuarioRepComp.push(i.usuario);
        }
        for(let i of this.usuarioRepComp){
          if(this.idLocal==i){
            this.mostrarBotones=true;
            console.log("BOTON TRUE");
          }
        }

      },
      err=>console.log(err)
    );
  }

}
