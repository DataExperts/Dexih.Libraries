import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { TableComponent } from './table/table.component';
import { AppComponent } from './app.component';
import { ChildComponent } from './components/child.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'components', children: [
    { path: '', component: ComponentsComponent },
    { path: 'child', component: ChildComponent },
  ]},
  { path: 'table',  component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
