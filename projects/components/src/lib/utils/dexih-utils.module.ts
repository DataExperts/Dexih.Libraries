import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DRemoveWrapperDirective } from './dexih-remove-wrapper.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DRemoveWrapperDirective
  ],
  exports: [
    DRemoveWrapperDirective
  ],
})
export class DUtilsModule {
}
