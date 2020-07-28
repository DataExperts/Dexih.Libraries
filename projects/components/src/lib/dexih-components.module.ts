import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DWidgetModule } from './widget/d-widget.module';
import { DButtonsModule } from './buttons/d-buttons.module';
import { DFormControlsModule } from './form-controls/form-controls.module';
import { DProgressModule } from './progress/d-progress.module';
import { DToastModule } from './toast/d-toast.module';
import { DModalModule } from './modal/d-modal.module';
import { DMarkdownModule } from 'ngx-d-markdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DWidgetModule,
    DButtonsModule,
    DFormControlsModule,
    DProgressModule,
    DToastModule,
    DModalModule,
    DMarkdownModule
  ],
  declarations: [
  ],
  exports: [
    DWidgetModule,
    DButtonsModule,
    DFormControlsModule,
    DProgressModule,
    DToastModule,
    DModalModule,
    // DMarkdownModule
  ]
})
export class DComponentsModule {
}
