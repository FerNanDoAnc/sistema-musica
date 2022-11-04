import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';
import {io} from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket:any; 
  private baseUrl:string = environment.baseUrlSocket;

  constructor() {
    this.socket=io(this.baseUrl,{
      withCredentials:true,
      autoConnect:true,
      'transports': ['websocket', 'polling']
    });
  }

  listen(eventName:string):Observable<any>{
    return new Observable((subscriber)=>{
      this.socket.on(eventName,(data:any)=>{
        subscriber.next(data);
      })
    })
  }

  emit(eventName:string, data:any){
    this.socket.emit(eventName, data);
  }
  emitirEvento(evento:string, data:any):Observable<any>{
    this.socket.emit(evento, data);
    return new Observable((subscriber)=>{
      this.socket.on(evento,(data:any)=>{ 
        subscriber.next(data);
      })
    });
  }

  // Forma antigua
  io =io(this.baseUrl,{
    withCredentials:true,
    autoConnect:true,
    'transports': ['websocket', 'polling']
  });

}
