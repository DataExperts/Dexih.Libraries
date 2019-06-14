import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgxMdModule } from 'ngx-md';
import { BsDropdownModule, ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AppComponent } from './app.component';

import { DexihComponentsModule } from '../../projects/components/src/public-api';
import { HttpClientModule } from '@angular/common/http';

const ROUTES: Route[] = [
  // HERE ROUTES DEFINITIONS
];

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    BsModalService,
    BsModalRef
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    NgxMdModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    DexihComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
