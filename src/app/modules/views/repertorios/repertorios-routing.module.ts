import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepertoriosComponent } from './repertorios.component';
import { AgregarRepertorioComponent } from './agregar-repertorio/agregar-repertorio.component';

const routes: Routes = [

  {
    path: '', 
    children: [
      {path: '', component: RepertoriosComponent},
      {path: '', redirectTo: 'repertorios'},
      {path: 'agregar', component: AgregarRepertorioComponent},
      { path: '**', redirectTo: 'repertorios' }
    ]
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RepertoriosRoutingModule { }
