import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DexihProgressDirective } from './dexih-progress.directive';
import { DexihProgressbarComponent } from './dexih-progress.component';
import { DexihBarComponent } from './dexih-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    DexihProgressDirective,
    DexihProgressbarComponent,
    DexihBarComponent
  ],
  exports: [DexihProgressbarComponent],
})
export class DexihProgressModule {

}
