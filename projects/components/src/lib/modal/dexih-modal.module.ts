import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DexihModalComponent } from './dexih-modal.component';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ModalModule
      ],
    exports: [
      DexihModalComponent,
    ],
    declarations: [
      DexihModalComponent,
    ],
    entryComponents: [
      DexihModalComponent,
    ]
})
export class DexihModalModule { }
