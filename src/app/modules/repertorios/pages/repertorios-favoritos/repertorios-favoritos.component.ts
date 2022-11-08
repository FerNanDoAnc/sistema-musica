import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../../../shared/services/web-socket.service';
import { RepertorioService } from '../../../../shared/services/repertorio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repertorios-favoritos',
  templateUrl: './repertorios-favoritos.component.html',
  styleUrls: ['./repertorios-favoritos.component.scss']
})
export class RepertoriosFavoritosComponent implements OnInit {

  idLocal:any=localStorage.getItem('_id');
  repertorios:any[]=[]; 

  constructor(
    private webSocketService: WebSocketService,
    private repertoriosService: RepertorioService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getRepertoriosList();
    this.listUpdate();
  }

  listUpdate(){
    this.webSocketService.listen('update-index-cancion').subscribe((data)=>{ 
      this.getRepertoriosList();
    })
  }

  getRepertoriosList(){
    this.repertoriosService.getRepertorioPorUsuario(this.idLocal)
    .subscribe(
      repertorios=>{
        repertorios.forEach((repertorio:any) => {
          if(repertorio.favorito){
            this.repertorios.push(repertorio);
          }
        });
      },
      err=>console.log(err)
    );
  }

  volver(){ 
    this.router.navigate(['/home/repertorios/lista']);
  }

}
