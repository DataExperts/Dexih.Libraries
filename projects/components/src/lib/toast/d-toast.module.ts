import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DToastComponent } from './d-toast.component';
import { DToastItemComponent } from './d-toast-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
      ],
    exports: [
      DToastComponent,
      DToastItemComponent
    ],
    declarations: [
      DToastComponent,
      DToastItemComponent
    ],
    entryComponents: [
      DToastItemComponent
    ]
})
export class DToastModule { }
