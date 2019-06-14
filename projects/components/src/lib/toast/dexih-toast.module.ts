import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DexihToastComponent } from './dexih-toast.component';
import { DexihToastItemComponent } from './dexih-toast-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
      ],
    exports: [
      DexihToastComponent,
      DexihToastItemComponent
    ],
    declarations: [
      DexihToastComponent,
      DexihToastItemComponent
    ],
    entryComponents: [
      DexihToastItemComponent
    ]
})
export class DexihToastModule { }
