import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-close',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonCloseComponent extends DButtonComponent {
    @Input() title = 'Close this window';
    iconClass = 'fa fa-close';
    buttonClass = 'btn-danger';
    text = 'Close';
}
