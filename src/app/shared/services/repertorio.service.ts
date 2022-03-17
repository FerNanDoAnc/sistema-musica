import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Repertorio } from '../../core/interfaces/repertorio.interface';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepertorioService {

  private _repertorio!:Repertorio;
  
  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }
  
  getRepertorios():Observable<Repertorio[]>{
   return this.http.get<Repertorio[]>(`${this.baseUrl}/repertorios`)
    .pipe(
      map(
        (resp:any )=>{
          console.log("_repertorio=",resp);
          return resp.repertorios;
        }
      )
    );
  }

  getRepertorioPorId(id:string):Observable<Repertorio>{
    return this.http.get<Repertorio>(`${this.baseUrl}/repertorios/${id}`);
  }

  getSugerencias(termino:string):Observable<Repertorio[]>{
    return this.http.get<Repertorio[]>(`${this.baseUrl}/repertorios?q=${termino}&_limit=5`);
  }

  agregarRepertorio(heroe: Repertorio):Observable<Repertorio>{
    return this.http.post<Repertorio>(`${this.baseUrl}/repertorios`, heroe);
  }

  actualizarRepertorio(heroe: Repertorio):Observable<Repertorio>{
    return this.http.put<Repertorio>(`${this.baseUrl}/repertorios/${heroe.uid}`, heroe);
  }
  borrarRepertorio(id:string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/repertorios/${id}`);
  }
}
