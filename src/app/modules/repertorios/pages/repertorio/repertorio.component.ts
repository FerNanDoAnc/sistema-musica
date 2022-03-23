import { Component, OnInit } from '@angular/core';
import { RepertorioList } from '../../../../core/interfaces/repertorio.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RepertorioService } from '../../../../shared/services/repertorio.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-repertorio',
  templateUrl: './repertorio.component.html',
  styleUrls: ['./repertorio.component.scss']
})
export class RepertorioComponent implements OnInit {

  repertorio! : any;
  
  // repertorio! : RepertorioList;  

  constructor(
    private activatedRoute:ActivatedRoute,
    private repertoriosService:RepertorioService,
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
  }

  volver(){
    this.router.navigate(['/home/repertorios']);
  }

}
