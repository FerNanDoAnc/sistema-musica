import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './views/users/users.component';
import { HomeComponent } from './views/home/home.component';
import { VisorpdfComponent } from './components/visorpdf/visorpdf.component'; 
import { SongsComponent } from './views/songs/songs.component';
import { CreateUserComponent } from './views/create-user/create-user.component';
import { CreateSongComponent } from './views/create-song/create-song.component';
import { LoginComponent } from './views/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    HomeComponent,
    VisorpdfComponent,
    SongsComponent,
    CreateUserComponent,
    CreateSongComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
