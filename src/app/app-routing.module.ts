import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {UsersPageComponent} from './users-page/users-page.component';
import {StatisticsPageComponent} from './statistic-page/statistics-page.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: MainPageComponent},
      {path: 'users', component: UsersPageComponent, children: [
          {path: 'statistic/:id', component: StatisticsPageComponent}
      ]},
      {path: 'users/:id', component: StatisticsPageComponent}
    ]
  },
  {
    path: 'admin',  loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
