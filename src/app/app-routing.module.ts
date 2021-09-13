import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { SongsComponent } from './views/songs/songs.component';
import { UsersComponent } from './views/users/users.component';
import { VisorpdfComponent } from './components/visorpdf/visorpdf.component';
import { CreateUserComponent } from './views/create-user/create-user.component';
import { CreateSongComponent } from './views/create-song/create-song.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'usuarios',
    component: UsersComponent
  },
  {
    path: 'crear-usuario',
    component: CreateUserComponent
  },
  {
    path: 'canciones',
    component: SongsComponent
  },
  {
    path: 'crear-cancion',
    component: CreateSongComponent
  },
  {
    path: 'visorpdf',
    component: VisorpdfComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
