import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMdModule } from 'ngx-md';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DexihComponentsModule } from '../../projects/components/src/public-api';
import { DexihTableModule } from '../../projects/table/src/public-api';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsComponent } from './test/components/components.component';
import { ChildComponent } from './test/components/child.component';
import { TableComponent } from './test/table/table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TableDemoComponent } from './demo/table-demo.component';
import { ComponentsDemoComponent } from './demo/components-demo.component';
import { NgxGist } from './gist/ngx-gist.component'

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    ChildComponent,
    TableComponent,
    TableDemoComponent,
    ComponentsDemoComponent,
    NgxGist
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxMdModule,
    DexihComponentsModule,
    DexihTableModule,
    DragDropModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
