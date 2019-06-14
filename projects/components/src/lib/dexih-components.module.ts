import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DexihWidgetModule } from './widget/dexih-widget.module';
import { DexihButtonsModule } from './buttons/dexihButtons.module';
import { DexihFormControlsModule } from './form-controls/dexih-form-controls.module';
import { NgxMdModule } from 'ngx-md';
import { DexihProgressModule } from './progress/dexih-progress.module';
import { DexihToastModule } from './toast/dexih-toast.module';
import { DexihModalModule } from './modal/dexih-modal.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxMdModule,
    DexihWidgetModule,
    DexihButtonsModule,
    DexihFormControlsModule,
    DexihProgressModule,
    DexihToastModule,
    DexihModalModule,
  ],
  declarations: [
  ],
  exports: [
    DexihWidgetModule,
    DexihButtonsModule,
    DexihFormControlsModule,
    DexihProgressModule,
    DexihToastModule,
    DexihModalModule,
  ]
})
export class DexihComponentsModule {
}
