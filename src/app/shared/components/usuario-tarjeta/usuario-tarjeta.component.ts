import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-tarjeta',
  templateUrl: './usuario-tarjeta.component.html',
  styleUrls: ['./usuario-tarjeta.component.scss']
})
export class UsuarioTarjetaComponent {

  @Input() usuario!: any ;

  constructor(
    private router:Router,
  ) { }

  volver(){
    this.router.navigate(['/home/repertorios/lista']);
  }
}
