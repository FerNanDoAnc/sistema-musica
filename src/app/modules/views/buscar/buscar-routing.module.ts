import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarComponent } from './buscar.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {path: '', component: BuscarComponent},
      {path: '', redirectTo: 'buscar'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscarRoutingModule { }
