import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/config/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

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
