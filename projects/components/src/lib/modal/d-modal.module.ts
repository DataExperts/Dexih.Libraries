import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DModalComponent } from './d-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
      ],
    exports: [
      DModalComponent,
    ],
    declarations: [
      DModalComponent,
    ],
    entryComponents: [
      DModalComponent,
    ]
})
export class DModalModule { }
