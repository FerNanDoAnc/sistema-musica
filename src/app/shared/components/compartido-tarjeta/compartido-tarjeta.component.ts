import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compartido-tarjeta',
  templateUrl: './compartido-tarjeta.component.html',
  styleUrls: ['./compartido-tarjeta.component.scss']
})
export class CompartidoTarjetaComponent implements OnInit {

  @Input() compartido!: any ;
  
  constructor() { }

  ngOnInit(): void {
  }

}
