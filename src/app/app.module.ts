import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { StatisticsPageComponent } from './statistic-page/statistics-page.component';
import {HttpClientModule} from '@angular/common/http';
import { StatisticFilterComponent } from './statistic-page/statistic-filter/statistic-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    StatisticsPageComponent,
    UsersPageComponent,
    MainLayoutComponent,
    StatisticFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
