import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMdModule } from 'ngx-md';
import { BsDropdownModule, ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DexihComponentsModule } from '../../projects/components/src/public-api';
import { DexihTableModule } from '../../projects/table/src/public-api';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsComponent } from './components/components.component';
import { TableComponent } from './table/table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    TableComponent
  ],
  providers: [
    BsModalService,
    BsModalRef
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxMdModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    DexihComponentsModule,
    DexihTableModule,
    DragDropModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
