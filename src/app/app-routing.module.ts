import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './test/components/components.component';
import { TableComponent } from './test/table/table.component';

const routes: Routes = [
    { path: 'test', children: [
      { path: 'components', component: ComponentsComponent },
      { path: 'table',  component: TableComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
