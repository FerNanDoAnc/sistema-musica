import { Component, Input, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-repertorio-tarjeta',
  templateUrl: './repertorio-tarjeta.component.html',
  styleUrls: ['./repertorio-tarjeta.component.scss']
})
export class RepertorioTarjetaComponent implements OnInit {

  @Input() repertorio!: any ;

  constructor(
    private webSocketService: WebSocketService,
  ) { }

  ngOnInit(){

  }

  updateSelect(event:any,id: any) {
    this.repertorio.favorito = event.checked;
    this.updateFavoritoCan(this.repertorio);
  }

  updateFavoritoCan(data:any){  
    this.webSocketService.emit('update-repertorio',data);
  }
  
}
