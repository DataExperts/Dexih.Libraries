import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-view',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonViewComponent extends DButtonComponent {
    @Input() title = 'View the current item';
    iconClass = 'fa fa-binoculars';
    buttonClass = 'btn-primary';
    text = 'View';
}
