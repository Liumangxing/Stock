import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockManageComponent } from './stock/stock-manage/stock-manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockFormComponent } from './stock/stock-form/stock-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'stock',
    component: StockManageComponent
  },
  {
    path: 'stock/:id',
    component: StockFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
