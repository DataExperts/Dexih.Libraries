import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './test/components/components.component';
import { TableComponent } from './test/table/table.component';
import { TableDemoComponent } from './demo/table-demo.component';
import { ComponentsDemoComponent } from './demo/components-demo.component';

const routes: Routes = [
    { path: 'test', children: [
      { path: 'components', component: ComponentsComponent },
      { path: 'table',  component: TableComponent },
    ]},
    { path: 'demo', children: [
      { path: 'components', component: ComponentsDemoComponent },
      { path: 'table',  component: TableDemoComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
