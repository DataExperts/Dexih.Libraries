import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DButtonComponent } from './d-button.component';
import { DButtonCancelComponent } from './d-button-cancel.component';
import { DButtonApplyComponent } from './d-button-apply.component';
import { DButtonNewComponent } from './d-button-new.component';
import { DButtonDeleteComponent } from './d-button-delete.component';
import { DButtonSaveComponent } from './d-button-save.component';
import { DButtonSaveLocalComponent } from './d-button-save-local.component';
import { DButtonEditComponent } from './d-button-edit.component';
import { DButtonPreviewComponent } from './d-button-preview.component';
import { DButtonViewComponent } from './d-button-view.component';
import { DButtonExportComponent } from './d-button-export.component';
import { DButtonDownloadComponent } from './d-button-download.component';
import { DButtonCloseComponent } from './d-button-close.component';
import { DButtonRefreshComponent } from './d-button-refresh.component';
import { DButtonOpenComponent } from './d-button-open.component';
import { DButtonShareComponent } from './d-button-share.component';
import { DButtonPrivateComponent } from './d-button-private.component';
import { DButtonDropDownComponent } from './d-button-dropdown.component';
import { DButtonMoreComponent } from './d-button-more.component';
import { DButtonSplitDropDownComponent } from './d-button-splitdropdown.component';
import { DButtonValidateComponent } from './d-button-validate.component';
import { DButtonHistoryComponent } from './d-button-history.component';
import { DButtonLinkComponent } from './d-button-link.component';
import { DButtonChartComponent } from './d-button-chart.component';
import { DButtonCollapsibleComponent } from './d-button-collapsible.component';
import { DDropDownItem } from './d-dropdown-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        DButtonComponent,
        DButtonCancelComponent,
        DButtonApplyComponent,
        DButtonNewComponent,
        DButtonDeleteComponent,
        DButtonSaveComponent,
        DButtonSaveLocalComponent,
        DButtonEditComponent,
        DButtonPreviewComponent,
        DButtonViewComponent,
        DButtonExportComponent,
        DButtonDownloadComponent,
        DButtonRefreshComponent,
        DButtonDropDownComponent,
        DButtonCloseComponent,
        DButtonOpenComponent,
        DButtonShareComponent,
        DButtonPrivateComponent,
        DButtonMoreComponent,
        DButtonSplitDropDownComponent,
        DButtonValidateComponent,
        DButtonHistoryComponent,
        DButtonLinkComponent,
        DButtonChartComponent,
        DButtonCollapsibleComponent,
        DDropDownItem,
    ],
    declarations: [
        DButtonComponent,
        DButtonCancelComponent,
        DButtonApplyComponent,
        DButtonNewComponent,
        DButtonDeleteComponent,
        DButtonSaveComponent,
        DButtonSaveLocalComponent,
        DButtonEditComponent,
        DButtonPreviewComponent,
        DButtonRefreshComponent,
        DButtonViewComponent,
        DButtonExportComponent,
        DButtonDownloadComponent,
        DButtonDropDownComponent,
        DButtonCloseComponent,
        DButtonOpenComponent,
        DButtonShareComponent,
        DButtonPrivateComponent,
        DButtonMoreComponent,
        DButtonSplitDropDownComponent,
        DButtonValidateComponent,
        DButtonHistoryComponent,
        DButtonLinkComponent,
        DButtonChartComponent,
        DButtonCollapsibleComponent,
        DDropDownItem,
    ],
    providers: [],
})
export class DButtonsModule { }
