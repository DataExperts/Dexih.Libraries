import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-validate',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonValidateComponent extends DButtonComponent {
    @Input() title = 'Validate the current form';
    iconClass = 'fa fa-check-square-o';
    buttonClass = 'btn-success';
    text = 'Validate';
}
