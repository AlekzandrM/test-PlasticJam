import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {Statistics, Users} from '../shared/interfaces';
import {Chart} from 'chart.js'
import * as moment from 'moment'



@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements  OnInit, AfterViewInit, OnDestroy {

  @ViewChild('clicks') clicksRef: ElementRef
  @ViewChild('views') viewsRef: ElementRef
  sSub$: Subscription

  firstName = ''
  lastName = ''


  pending = true
  isFilterVisible = false

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy() {
    if (this.sSub$) {
      this.sSub$.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.fetch()
  }

  ngOnInit() {
    // const params = Object.assign({})
    this.fetchUsers()
  }

  private fetchUsers() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.usersService.fetchById(params.id)
      })
    ).subscribe(user => {
      this.firstName = user.content[0].firstName
      this.lastName = user.content[0].lastName
      console.log(this.lastName)
    })
  }

  private fetch() {
    setTimeout(() => {
      const clicksConfig: any = {
        label: 'Clicks',
        color: 'rgb(58, 128, 186)'
      }

      const viewsConfig: any = {
        label: 'Views',
        color: 'rgb(58, 128, 186)'
      }

      this.sSub$ = this.route.params
        .pipe(
          // tap((params: Params) => {
          //   this.users$ = this.usersService.fetch().pipe(
          //     map(item => {
          //       const idx = 'content'
          //       let name
          //       if (item[idx].id === params.id) {
          //         name = item[idx].firstName
          //         return name
          //       }
          //     })
          //   )
          // }),
          switchMap((params: Params) => {
            return this.usersService.getStatistics(params.id)
          })
        )
        .subscribe((res: Statistics) => {

            viewsConfig.labels = res.chart.map(item => moment(item.date).format('DD.MM.YYYY'))
            viewsConfig.data = res.chart.map(item => item.page_views)

            clicksConfig.labels = res.chart.map(item => moment(item.date).format('DD.MM.YYYY'))
            clicksConfig.data = res.chart.map(item => item.clicks)

            const viewCtx = this.viewsRef.nativeElement.getContext('2d')
            viewCtx.canvas.height = '300px'
            const clickCtx = this.clicksRef.nativeElement.getContext('2d')
            clickCtx.canvas.height = '300px'

            new Chart(viewCtx, createCharConfig(viewsConfig))
            new Chart(clickCtx, createCharConfig(clicksConfig))

            this.pending = false
          }
        )
    })
  }

  useFilter() {
    this.isFilterVisible = !this.isFilterVisible
  }

}

function createCharConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}

