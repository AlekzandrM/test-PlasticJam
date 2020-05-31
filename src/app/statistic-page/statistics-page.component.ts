import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import { Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {tap, switchMap} from 'rxjs/operators';
import {Filter, Statistics} from '../shared/interfaces';
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
  fSub$: Subscription

  firstName = ''
  lastName = ''
  filter: Filter = {
    from: moment().add(-7, 'd').format('DD.MM.YYYY'),
    to: moment().format('DD.MM.YYYY')
  }
  param = {}

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
    if (this.fSub$) {
      this.fSub$.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.fetch()
  }

  ngOnInit() {
    this.fetchUser()
  }

  applyFilter(filter: Filter) {
    this.filter = filter
    this.fetch()
  }

  private fetchUser() {
    this.fSub$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.usersService.fetchById(params.id)
      })
    ).subscribe(user => {
      this.firstName = user.content[0].firstName
      this.lastName = user.content[0].lastName
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
          params => {
            this.param = params

            const newParams = Object.assign({}, this.param, this.filter)
            return this.usersService.getStatistics(newParams)
          }
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

