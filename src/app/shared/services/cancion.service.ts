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
          console.log("getCancionPorRepertorio",resp);
          return resp.canciones;
        }
      )
    );
  }

}
