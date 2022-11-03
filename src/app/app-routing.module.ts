import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudTableComponentView } from './dashboard/crud-table/crud-table.component';

const routes: Routes = [
  { path:'crudTable', component: CrudTableComponentView }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
