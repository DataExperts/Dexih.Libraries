import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DWidgetComponent } from './d-widget.component';
import { DWidgetColumnsComponent } from './d-widget-columns.component';
import { DWidgetDeckComponent } from './d-widget-deck.component';
import { DWidgetVerticalComponent } from './d-widget-vertical.component';
import { DWidgetGroupComponent } from './d-widget-group.component';
import { DWidgetSectionComponent } from './d-widget-section.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DWidgetComponent,
    DWidgetGroupComponent,
    DWidgetColumnsComponent,
    DWidgetDeckComponent,
    DWidgetVerticalComponent,
    DWidgetSectionComponent,
  ],
  exports: [
    DWidgetComponent,
    DWidgetGroupComponent,
    DWidgetColumnsComponent,
    DWidgetDeckComponent,
    DWidgetVerticalComponent,
    DWidgetSectionComponent,
  ],
})
export class DWidgetModule {
}
