import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-preview',
    templateUrl: './dexih-button.component.html',
    styleUrls: ['./dexih-button.component.scss']
})

export class DexihButtonPreviewComponent extends DexihButtonComponent {
    @Input() title = 'Preview the current item';
    iconClass = 'fa fa-table';
    buttonClass = 'btn-primary';
    text = 'Preview';
}
