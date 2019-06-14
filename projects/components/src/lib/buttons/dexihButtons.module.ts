import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DexihButtonComponent } from './dexih-button.component';
import { DexihButtonCancelComponent } from './dexih-button-cancel.component';
import { DexihButtonApplyComponent } from './dexih-button-apply.component';
import { DexihButtonNewComponent } from './dexih-button-new.component';
import { DexihButtonDeleteComponent } from './dexih-button-delete.component';
import { DexihButtonSaveComponent } from './dexih-button-save.component';
import { DexihButtonSaveLocalComponent } from './dexih-button-save-local.component';
import { DexihButtonEditComponent } from './dexih-button-edit.component';
import { DexihButtonPreviewComponent } from './dexih-button-preview.component';
import { DexihButtonViewComponent } from './dexih-button-view.component';
import { DexihButtonExportComponent } from './dexih-button-export.component';
import { DexihButtonDownloadComponent } from './dexih-button-download.component';
import { DexihButtonCloseComponent } from './dexih-button-close.component';
import { DexihButtonRefreshComponent } from './dexih-button-refresh.component';
import { DexihButtonOpenComponent } from './dexih-button-open.component';
import { DexihButtonShareComponent } from './dexih-button-share.component';
import { DexihButtonPrivateComponent } from './dexih-button-private.component';
import { DexihButtonDropDownComponent } from './dexih-button-dropdown.component';
import { DexihButtonMoreComponent } from './dexih-button-more.component';
import { DexihButtonSplitDropDownComponent } from './dexih-button-splitdropdown.component';
import { DexihButtonValidateComponent } from './dexih-button-validate.component';
import { DexihButtonHistoryComponent } from './dexih-button-history.component';
import { DexihButtonLinkComponent } from './dexih-button-link.component';
import { DexihButtonChartComponent } from './dexih-button-chart.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { DexihButtonCollapsibleComponent } from './dexih-button-collapsible.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BsDropdownModule
    ],
    exports: [
        DexihButtonComponent,
        DexihButtonCancelComponent,
        DexihButtonApplyComponent,
        DexihButtonNewComponent,
        DexihButtonDeleteComponent,
        DexihButtonSaveComponent,
        DexihButtonSaveLocalComponent,
        DexihButtonEditComponent,
        DexihButtonPreviewComponent,
        DexihButtonViewComponent,
        DexihButtonExportComponent,
        DexihButtonDownloadComponent,
        DexihButtonRefreshComponent,
        DexihButtonDropDownComponent,
        DexihButtonCloseComponent,
        DexihButtonOpenComponent,
        DexihButtonShareComponent,
        DexihButtonPrivateComponent,
        DexihButtonMoreComponent,
        DexihButtonSplitDropDownComponent,
        DexihButtonValidateComponent,
        DexihButtonHistoryComponent,
        DexihButtonLinkComponent,
        DexihButtonChartComponent,
        DexihButtonCollapsibleComponent
    ],
    declarations: [
        DexihButtonComponent,
        DexihButtonCancelComponent,
        DexihButtonApplyComponent,
        DexihButtonNewComponent,
        DexihButtonDeleteComponent,
        DexihButtonSaveComponent,
        DexihButtonSaveLocalComponent,
        DexihButtonEditComponent,
        DexihButtonPreviewComponent,
        DexihButtonRefreshComponent,
        DexihButtonViewComponent,
        DexihButtonExportComponent,
        DexihButtonDownloadComponent,
        DexihButtonDropDownComponent,
        DexihButtonCloseComponent,
        DexihButtonOpenComponent,
        DexihButtonShareComponent,
        DexihButtonPrivateComponent,
        DexihButtonMoreComponent,
        DexihButtonSplitDropDownComponent,
        DexihButtonValidateComponent,
        DexihButtonHistoryComponent,
        DexihButtonLinkComponent,
        DexihButtonChartComponent,
        DexihButtonCollapsibleComponent
    ],
    providers: [],
})
export class DexihButtonsModule { }
