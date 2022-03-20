import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListadoRepertoriosComponent } from '../repertorios/pages/listado-repertorios/listado-repertorios.component';
import { AgregarRepertorioComponent } from '../repertorios/pages/agregar-repertorio/agregar-repertorio.component';

const routes: Routes = [

  // {
  //   // path: '',
  //   // children: [
  //   //   {path: '', component: HomePageComponent},
  //   //   {path: '', redirectTo: 'home'}
  //   // ],

  //   path: '',
  //   component: HomePageComponent,
    
  // },
  {
    path: '', 
    component: HomePageComponent,
    children: [
      {path: 'repertorios', component: ListadoRepertoriosComponent},
      {path: '', redirectTo: 'repertorios'},
      {path: 'repertorios/agregar', component: AgregarRepertorioComponent},
      { path: '**', redirectTo: 'repertorios' }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
