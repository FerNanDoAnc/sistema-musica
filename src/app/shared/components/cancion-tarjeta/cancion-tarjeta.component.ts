import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cancion-tarjeta',
  templateUrl: './cancion-tarjeta.component.html',
  styleUrls: ['./cancion-tarjeta.component.scss']
})
export class CancionTarjetaComponent {

  constructor() { }

  @Input() cancion!: any ;

}
