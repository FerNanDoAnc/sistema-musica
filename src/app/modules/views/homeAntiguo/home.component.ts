import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/core/config/proyecto.interface';
import { User } from 'src/app/core/config/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public proyectos:Proyecto[]=[
    {  
      img: "#1",
      name:'Proyecto-1', 
      description:'repertorio oyopiz',
    },
    {
      img: "#2",
      name:'Proyecto-2', 
      description:'repertorio guevara',
    }
  ]

  public users: User[] = [
    {
      name: 'Juan jose Oyopizango',
      role: 'Baterista',
      number: '123123123'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
