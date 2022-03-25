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
          console.log("Usuario",resp);
          return resp.usuario;
        }
      )
    );
  }

  actualizarUsuario(usuario: any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/usuarios/${usuario.uid}`, usuario);
  }

  // agregarRepertorio(repertorio: RepertorioList):Observable<RepertorioList>{
  //   return this.http.post<RepertorioList>(`${this.baseUrl}/repertorios`, repertorio);
  // }

  // actualizarRepertorio(repertorio: any):Observable<any>{
  //   return this.http.put<any>(`${this.baseUrl}/repertorios/${repertorio._id}`, repertorio);
  // }
  // borrarRepertorio(_id:string):Observable<any>{
  //   return this.http.delete<any>(`${this.baseUrl}/repertorios/${_id}`);
  // }
}
