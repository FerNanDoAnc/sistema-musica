import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-integrante-tarjeta',
  templateUrl: './integrante-tarjeta.component.html',
  styleUrls: ['./integrante-tarjeta.component.scss']
})
export class IntegranteTarjetaComponent implements OnInit {

  @Input() integrante!: any ;

  constructor() { }

  ngOnInit(): void {
  }

  borrarUsuario() {
    console.log('Borrar usuario');
  }
}
