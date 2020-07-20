import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-preview',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonPreviewComponent extends DButtonComponent {
    @Input() title = 'Preview the current item';
    iconClass = 'fa fa-table';
    buttonClass = 'btn-primary';
    text = 'Preview';
}
