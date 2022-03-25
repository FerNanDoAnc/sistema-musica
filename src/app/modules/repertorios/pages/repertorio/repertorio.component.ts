import { Component, OnInit } from '@angular/core';
import { RepertorioList } from '../../../../core/interfaces/repertorio.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RepertorioService } from '../../../../shared/services/repertorio.service';
import { switchMap } from 'rxjs/operators';
import { CancionService } from '../../../../shared/services/cancion.service';

@Component({
  selector: 'app-repertorio',
  templateUrl: './repertorio.component.html',
  styleUrls: ['./repertorio.component.scss']
})
export class RepertorioComponent implements OnInit {

  idRepertorioLocal:any=localStorage.getItem('_id_repertorio');

  repertorio! : any;
  // canciones! : any;
  canciones:any[]=[];
  
  // repertorio! : RepertorioList;  

  constructor(
    private activatedRoute:ActivatedRoute,
    private repertoriosService:RepertorioService,
    private cancionesService:CancionService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap( ({_id})=>this.repertoriosService.getRepertorioPorId(_id))
    )
    .subscribe( repertorio=>{
      this.repertorio=repertorio; 
    });

    this.getCancionRepertorio();
  }

  volver(){
    this.router.navigate(['/home/repertorios']);
  }

  getCancionRepertorio(){
    this.activatedRoute.params
    .pipe(
      switchMap(({_id})=>this.cancionesService.getCancionPorRepertorio(_id)))
    .subscribe(
      canciones=>{
        this.canciones=canciones;
        console.log("canciones",canciones);
      },
      err=>console.log(err)
    );
  }

}
