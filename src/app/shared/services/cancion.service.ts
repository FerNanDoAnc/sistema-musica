import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  private baseUrl:string = environment.baseUrl;
  constructor(
    private http:HttpClient
  ) { }

  getCancionPorRepertorio(_id:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/canciones/repertorio/${_id}`)
    .pipe(
      map(
        (resp:any )=>{
          return resp.canciones;
        }
      )
    );
  }

  agregarCancion(canciones: any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/canciones`, canciones);
  }

  getCancionPorId(_id:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/canciones/${_id}`)
    .pipe(
      map(
        (resp:any )=>{
          console.log("SERV CACN POR ID",resp);
          return resp.repertorio;
        }
      )
    );
  }
  actualizarCancion(cancion: any):Observable<any>{
    console.log("ACTUALIZAR CANCION",cancion);
    return this.http.put<any>(`${this.baseUrl}/canciones/${cancion._id}`, cancion);
  }
  borrarCancion(_id:string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/canciones/${_id}`);
  }
}
