import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DexihFormInputComponent } from './dexih-form-input.component';
import { DexihFormDateComponent } from './dexih-form-date.component';
import { DexihFormTimeComponent } from './dexih-form-time.component';
import { DexihFormTextAreaComponent } from './dexih-form-textarea.component';
import { DexihFormSelectComponent } from './dexih-form-select.component';
import { DexihFormCheckboxComponent } from './dexih-form-checkbox.component';
import { DexihFormDaysOfWeekComponent } from './dexih-form-daysofweek.component';
import { DexihFormTagsComponent } from './dexih-form-tags.component';
import { DexihFormTagsDropdownComponent } from './dexih-form-tagsDropdown.component';

import { DexihSelectFilterPipe } from './dexih-select-filter.pipe';
import { NgxMdModule } from 'ngx-md';
import { BaseInputComponent } from './base-input.component';
import { BaseTemplateComponent } from './base-template.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMdModule,
  ],
  declarations: [
    DexihFormInputComponent,
    DexihFormDateComponent,
    DexihFormTimeComponent,
    DexihFormTextAreaComponent,
    DexihFormSelectComponent,
    DexihFormCheckboxComponent,
    DexihFormDaysOfWeekComponent,
    DexihFormTagsComponent,
    DexihFormTagsDropdownComponent,
    DexihSelectFilterPipe,
    BaseInputComponent,
    BaseTemplateComponent
  ],
  exports: [
    DexihFormInputComponent,
    DexihFormDateComponent,
    DexihFormTimeComponent,
    DexihFormTextAreaComponent,
    DexihFormSelectComponent,
    DexihFormCheckboxComponent,
    DexihFormDaysOfWeekComponent,
    DexihFormTagsComponent,
    DexihFormTagsDropdownComponent,
    DexihSelectFilterPipe,
  ],
})
export class DexihFormControlsModule {

}
