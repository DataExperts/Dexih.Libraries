import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-share',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonShareComponent extends DButtonComponent {
    @Input() title = 'Share the selected items';
    iconClass = 'fa fa-group';
    buttonClass = 'btn-primary';
    text = 'Share';
}
