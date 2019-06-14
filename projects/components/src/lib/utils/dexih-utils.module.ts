import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DexihRemoveWrapperDirective } from './dexih-remove-wrapper.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DexihRemoveWrapperDirective
  ],
  exports: [
    DexihRemoveWrapperDirective
  ],
})
export class DexihUtilsModule {
}
