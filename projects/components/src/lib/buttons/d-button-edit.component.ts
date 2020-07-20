import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-edit',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonEditComponent extends DButtonComponent {
    @Input() title = 'Edit the current item';
    iconClass = 'fa fa-edit';
    buttonClass = 'btn-primary';
    text = 'Edit';
}
