import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Filter} from '../../shared/interfaces';

@Component({
  selector: 'app-statistic-filter',
  templateUrl: './statistic-filter.component.html',
  styleUrls: ['./statistic-filter.component.scss']
})
export class StatisticFilterComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFilter = new EventEmitter<Filter>()

  form: FormGroup

  minDate = new Date(2020, 3, 3)
  maxDate = new Date()

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      from: new FormControl(null),
      to: new FormControl(null)
    })
  }

  ngAfterViewInit() {
  }

  submitFilter() {
    const dateFilter: Filter = {
      from: this.form.value.from,
      to: this.form.value.to
    }
    this.onFilter.emit(dateFilter)
  }
}
