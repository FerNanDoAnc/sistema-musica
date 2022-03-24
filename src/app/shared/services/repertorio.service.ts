import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Repertorio, RepertorioList } from '../../core/interfaces/repertorio.interface';
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
          console.log("getRepertoriosAll",resp);
          return resp.repertorios;
        }
      )
    );
  }
  getRepertorioPorUsuario(_id:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/repertorios/usuario/${_id}`)
    .pipe(
      map(
        (resp:any )=>{
          console.log("getRepertorioPorUusario",resp.repertorios);
          return resp.repertorios;
        }
      )
    );
  }
  getRepertorioPorId(_id:string):Observable<RepertorioList>{
    return this.http.get<RepertorioList>(`${this.baseUrl}/repertorios/${_id}`)
    .pipe(
      map(
        (resp:any )=>{
          return resp.repertorio;
        }
      )
    );
  }

  getSugerencias(termino:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/repertorios?q=${termino}&_limit=4`)
    .pipe(
      map(
        (resp:any )=>{
          console.log("getRepertorioPorId=",resp);
          return resp.repertorio;
        }
      )
    );
  }

  agregarRepertorio(repertorio: RepertorioList):Observable<RepertorioList>{
    return this.http.post<RepertorioList>(`${this.baseUrl}/repertorios`, repertorio);
  }

  actualizarRepertorio(repertorio: any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/repertorios/${repertorio._id}`, repertorio);
  }
  borrarRepertorio(_id:string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/repertorios/${_id}`);
  }
}
