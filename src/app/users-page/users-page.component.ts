import { Component, OnInit } from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import {Observable, Subscription, of} from 'rxjs';
import {UserContent, Users} from '../shared/interfaces';
import {map} from 'rxjs/operators';

const STEP = 50

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  resp: Users[]
  content = []
  idx: string

  uSub: Subscription
  page = 0
  range = STEP

  totalPages = 0
  totalElements = 0


  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.fetch()
  }

  private fetch() {
    const params = Object.assign({}, {
      page: this.page,
      range: this.range
    })

    this.uSub = this.usersService.fetch(params)
      .pipe(
        map(item => {
          const idx = 'content'
          if (item[idx] !== null) {
            return item[idx]
          }
        })
      )
      .subscribe((users) => {

      console.log(users)
      users.map((item) => {
        this.content.push(item)
        console.log(this.content)
      })

      })

  }

}
