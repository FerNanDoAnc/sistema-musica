import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/config/user.interface';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  public users: User[] = [
    {
      name: 'Juan jose Oyopizango',
      role: 'Baterista',
      number: '123123123'
    },
    {
      name: 'Oyopizango',
      role: 'Baterista',
      number: '123123123'
    },
    {
      name: 'Oyopizango',
      role: 'Baterista',
      number: '123123123'
    },
    {
      name: 'Oyopizango',
      role: 'Baterista',
      number: '123123123'
    },
    {
      name: 'Oyopizango',
      role: 'Baterista',
      number: '123123123'
    },
    {
      name: 'Oyopizango',
      role: 'Baterista',
      number: '123123123'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
