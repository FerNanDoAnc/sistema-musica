import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './core/guards/validar-token.guard';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren:()=> import( './modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'home',
    loadChildren:()=> import( './modules/home/home.module').then(m=>m.HomeModule),
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  },
  // {
  //   path: 'repertorios',
  //   loadChildren:()=> import( './modules/repertorios/repertorios.module').then(m=>m.RepertoriosModule),
  //   canActivate:[ValidarTokenGuard],
  //   canLoad:[ValidarTokenGuard]
  // },
  {
    path: '**',
    redirectTo: 'auth'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
