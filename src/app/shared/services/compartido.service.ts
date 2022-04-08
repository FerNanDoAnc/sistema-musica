import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getRepertorioPorCompartido(correo:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/repertorios/compartido/${correo}`)
    .pipe(
      map(
        (resp:any )=>{

          console.log("COMPARTIDO SERVICE",resp.integrantes);
          return [resp.integrantes];
        }
      )
    );
  }
}
