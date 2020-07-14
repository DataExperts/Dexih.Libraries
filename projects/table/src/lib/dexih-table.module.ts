import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxMdModule } from 'ngx-md';

import { DexihTableCellComponent } from './dexih-table-cell.component';
import { DexihTableComponent } from './dexih-table.component';
import { TableFilterPipe } from './table-filter.pipe';
import { DexihTagDropDownComponent} from './dexih-tag-dropdown.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgxMdModule, // .forRoot(),
    DragDropModule,
  ],
  declarations: [
    DexihTableComponent,
    DexihTableCellComponent,
    TableFilterPipe,
    DexihTagDropDownComponent
  ],
  exports: [
    DexihTableComponent
  ],
  providers: []
})
export class DexihTableModule {

}
