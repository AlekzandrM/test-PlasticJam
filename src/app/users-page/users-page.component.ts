import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import { Subscription} from 'rxjs';
import {UserContent, Users} from '../shared/interfaces';
import {map} from 'rxjs/operators';

const STEP = 50

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  page1 = 1
  page2 = 2
  page3 = 3
  page4 = 4
  page5 = 5

  content = []
  isActive1 = true
  isActive2 = false
  isActive3 = false
  isActive4 = false
  isActive5 = false

  uSub: Subscription
  page = 1
  range = STEP

  noMoreUsers = false


  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.fetch()
  }
  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
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
        users.map((item) => {
          console.log(item)
          this.content.push(item)
        })
        this.noMoreUsers = this.content.length < STEP
      })

  }

  nextPages() {
    this.page1 += 5
    this.page2 += 5
    this.page3 += 5
    this.page4 += 5
    this.page5 += 5
  }
  previousPages() {
    if (this.page1 > 1) {
      this.page1 -= 5
      this.page2 -= 5
      this.page3 -= 5
      this.page4 -= 5
      this.page5 -= 5
    } else {
      return;
    }
  }
  loadNextUsers(event, page) {
    event.preventDefault()
    this.page = page
    this.range = STEP
    this.content = []
    this.fetch()

    if (this.page1 === page ) {
      this.isActive1 = true
      this.isActive2 = false
      this.isActive3 = false
      this.isActive4 = false
      this.isActive5 = false
    } else if (this.page2 === page) {
      this.isActive1 = false
      this.isActive2 = true
      this.isActive3 = false
      this.isActive4 = false
      this.isActive5 = false
    } else if (this.page3 === page) {
      this.isActive1 = false
      this.isActive2 = false
      this.isActive3 = true
      this.isActive4 = false
      this.isActive5 = false
    } else if (this.page4 === page) {
      this.isActive1 = false
      this.isActive2 = false
      this.isActive3 = false
      this.isActive4 = true
      this.isActive5 = false
    } else {
      this.isActive1 = false
      this.isActive2 = false
      this.isActive3 = false
      this.isActive4 = false
      this.isActive5 = true
    }
  }

}
