import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntegranteService {

  private baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  actualizarIntegranteRepertorio(repertorio: any):Observable<any>{
    console.log("CUD SERVICE",repertorio);
    return this.http.put<any>(`${this.baseUrl}/repertorios/${repertorio._id}`, repertorio);
  }

}
