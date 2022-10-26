import { Component, Input } from '@angular/core';
import { Repertorio } from '../../../core/interfaces/repertorio.interface';

@Component({
  selector: 'app-repertorio-tarjeta',
  templateUrl: './repertorio-tarjeta.component.html',
  styleUrls: ['./repertorio-tarjeta.component.scss']
})
export class RepertorioTarjetaComponent{

  @Input() repertorio!: any ;
  // @Input() usuariosData!: Repertorio;
}
