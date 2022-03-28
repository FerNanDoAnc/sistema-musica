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

  actualizarCanPartitura(cancion: any):Observable<any>{
    console.log("ADD REPERTORIO SERVICE",cancion);
    return this.http.put<any>(`${this.baseUrl}/uploads/canciones/${cancion._id}`, cancion);
  }

  actualizarUsuPartitura(usuario: any):Observable<any>{
    console.log("ACTUALIZAR CANCION",usuario);
    return this.http.put<any>(`${this.baseUrl}/uploads/usuarios/${usuario._id}`, usuario);
  }

}
