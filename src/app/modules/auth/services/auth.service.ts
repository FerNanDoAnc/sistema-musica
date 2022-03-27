import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AuthResponse, Usuario, AuthResponseLocalStorage } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = environment.baseUrl;
  private _usuario!:Usuario;

  // para no cambiar el valor accidentalmente
  get usuario(){
    return {...this._usuario};
  }
  constructor(

    private http:HttpClient

  ) { }

  // -------------------------------------------------
  // Registro de usuarios
  registro(nombre:string, correo:string, password:string){
    
    const url = `${this.baseUrl}/usuarios`;
    // const url = this.baseUrl + '/auth';
    const body = {nombre,correo,password};
    
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp=>{
          if(resp.ok){
            // para guardar info e el localstorage
            localStorage.setItem('token',resp.token!);

            //Viene descomprimido 
            // para poder llamar el swat alert 
            this._usuario = {
              uid: resp.uid!,
              nombre: resp.nombre!,
              correo: resp.correo!,
              rol: resp.rol!,
              msg: resp.msg
            }
          }
        }),
        map( valid=> valid.ok),
        catchError( err=>of(
          // err.error.msg ,
          err.error.errors[0].msg
        ))
      )
  }

  // -------------------------------------------------
  // Login de usuarios
  login(correo:string,password:string){
    
    const url = `${this.baseUrl}/auth/login`;
    // const url = this.baseUrl + '/auth';
    const body = {correo,password};

    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp=>{
          
          if(resp.ok){
            // para guardar info e el localstorage
            localStorage.setItem('token',resp.token!);
            this._usuario = {
              uid: resp.uid!,
              nombre: resp.nombre!,
              correo: resp.correo!,
              rol: resp.rol!,
              msg: resp.msg
            }

          }
        }),
        map( valid=> valid.ok),
        catchError( err=>of(
          err.error.msg ,
          // err.error.errors[0].msg
        ))
      )
    
  }

  // -------------------------------------------------
  // Validar token
  validarToken():Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token',localStorage.getItem('token') || '');

    return this.http.get<AuthResponseLocalStorage>(url,{headers})
      .pipe(
        map(resp=>{
          
          //Viene descomprimido 
          // para que no se borren los datos al recargar
          localStorage.setItem('token',resp.token!);
          localStorage.setItem('_id',resp._id!);
          // localStorage.setItem('usuario',JSON.stringify(resp));
          this._usuario = {
            nombre: resp.nombre!,
            uid: resp._id!,
            correo: resp.correo!,
            rol: resp.rol!
          }
          
          return resp.ok;
        }),
        catchError( err=>of(false))
      );
  }

  // -------------------------------------------------
  // Cerrar sesion
  logout(){
    localStorage.removeItem('repertorioPorId');
    localStorage.clear();
  }

}
