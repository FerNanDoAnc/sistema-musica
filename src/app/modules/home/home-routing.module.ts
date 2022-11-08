import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListadoRepertoriosComponent } from '../repertorios/pages/listado-repertorios/listado-repertorios.component';
import { AgregarRepertorioComponent } from '../repertorios/pages/agregar-repertorio/agregar-repertorio.component';
import { RepertorioComponent } from '../repertorios/pages/repertorio/repertorio.component';
import { BuscarComponent } from '../repertorios/pages/buscar/buscar.component';
import { ListarUsuarioComponent } from '../usuarios/pages/listar-usuario/listar-usuario.component';
import { ActualizarUsuarioComponent } from '../usuarios/pages/actualizar-usuario/actualizar-usuario.component';
import { ListarCompartidosComponent } from '../compartidos/pages/listar-compartidos/listar-compartidos.component';
import { RepertoriosFavoritosComponent } from '../repertorios/pages/repertorios-favoritos/repertorios-favoritos.component';

const routes: Routes = [
 
  {
    path: '', 
    component: HomePageComponent,
    children: [
      {path: 'repertorios/lista', component: ListadoRepertoriosComponent},
      {path: 'repertorios/agregar', component: AgregarRepertorioComponent},
      {path: 'repertorios/editar/:_id', component: AgregarRepertorioComponent},
      {path: 'repertorios/buscar', component: BuscarComponent },
      {path: 'repertorios/:_id', component: RepertorioComponent},
      {path: 'repertorios/lista/favoritos', component: RepertoriosFavoritosComponent},
      {path: 'usuario', component: ListarUsuarioComponent},
      {path: 'usuario/editar/:uid', component: ActualizarUsuarioComponent},
      {path: 'compartidos/lista', component: ListarCompartidosComponent},
      // {path: '', redirectTo: 'repertorios/lista'},
      {path: '**', redirectTo: 'repertorios/lista' }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
