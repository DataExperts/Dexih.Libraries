import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DFormInputComponent } from './form-input.component';
import { DFormDateComponent } from './form-date.component';
import { DFormTimeComponent } from './form-time.component';
import { DFormTextAreaComponent } from './form-textarea.component';
import { DFormSelectComponent } from './form-select.component';
import { DFormCheckboxComponent } from './form-checkbox.component';
import { DFormDaysOfWeekComponent } from './form-daysofweek.component';
import { DFormTagsComponent } from './form-tags.component';
import { DFormTagsDropdownComponent } from './form-tagsDropDown.component';

import { DSelectFilterPipe } from './select-filter.pipe';
import { BaseInputComponent } from './base-input.component';
import { BaseTemplateComponent } from './base-template.component';
import { DMarkdownModule } from '../markdown/d-markdown.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DMarkdownModule,
  ],
  declarations: [
    DFormInputComponent,
    DFormDateComponent,
    DFormTimeComponent,
    DFormTextAreaComponent,
    DFormSelectComponent,
    DFormCheckboxComponent,
    DFormDaysOfWeekComponent,
    DFormTagsComponent,
    DFormTagsDropdownComponent,
    DSelectFilterPipe,
    BaseInputComponent,
    BaseTemplateComponent
  ],
  exports: [
    DFormInputComponent,
    DFormDateComponent,
    DFormTimeComponent,
    DFormTextAreaComponent,
    DFormSelectComponent,
    DFormCheckboxComponent,
    DFormDaysOfWeekComponent,
    DFormTagsComponent,
    DFormTagsDropdownComponent,
    DSelectFilterPipe,
    DMarkdownModule,
  ],
})
export class DFormControlsModule {

}
