import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DProgressbarComponent } from './d-progress.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    DProgressbarComponent,
  ],
  exports: [DProgressbarComponent],
})
export class DProgressModule {

}
