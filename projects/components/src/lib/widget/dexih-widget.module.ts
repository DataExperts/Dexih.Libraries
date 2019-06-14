import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DexihWidgetComponent } from './dexih-widget.component';
import { DexihWidgetColumnsComponent } from './dexih-widget-columns.component';
import { DexihWidgetDeckComponent } from './dexih-widget-deck.component';
import { DexihWidgetVerticalComponent } from './dexih-widget-vertical.component';
import { DexihWidgetGroupComponent } from './dexih-widget-group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DexihWidgetComponent,
    DexihWidgetColumnsComponent,
    DexihWidgetDeckComponent,
    DexihWidgetVerticalComponent,
    DexihWidgetGroupComponent,
  ],
  exports: [
    DexihWidgetComponent,
    DexihWidgetColumnsComponent,
    DexihWidgetDeckComponent,
    DexihWidgetVerticalComponent,
    DexihWidgetGroupComponent,
  ],
})
export class DexihWidgetModule {
}
