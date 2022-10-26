import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {  

  private baseUrl:string = environment.baseUrl;

  constructor(
    private http:HttpClient,
  ) { }

  actualizarCanPartitura(cancion: FormData):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/uploads/canciones/${cancion.get('_id')}`, cancion);
  }

  actualizarUsuarioPerfil(usuario: FormData):Observable<any>{
    console.log("ACTUALIZAR REPERTORIO IMG",usuario);
    return this.http.put<any>(`${this.baseUrl}/uploads/usuarios/${usuario.get('uid')}`, usuario);
  }

  actualizarRepertorioPerfil(repertorio: FormData):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/uploads/repertorios/${repertorio.get('_id')}`, repertorio);
  }

}
