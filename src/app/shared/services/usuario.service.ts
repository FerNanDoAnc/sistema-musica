import { Injectable } from '@angular/core';
import { Usuario,UsuarioList } from 'src/app/core/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }
  
  getUsuarioPorId(uid:string):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/${uid}`)
    .pipe(
      map(
        (resp:any )=>{
          console.log("getUsuarioPorId",resp);
          return resp.usuario;
        }
      )
    );
  }

  actualizarUsuario(usuario: any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/usuarios/${usuario.uid}`, usuario);
  }

}
