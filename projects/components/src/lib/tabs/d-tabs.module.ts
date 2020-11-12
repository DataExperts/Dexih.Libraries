import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DTabComponent } from './d-tab.component';

import { DTabsComponent } from './d-tabs.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [DTabsComponent, DTabComponent],
    declarations: [DTabsComponent, DTabComponent],
    providers: [],
})
export class DTabsModule { }
