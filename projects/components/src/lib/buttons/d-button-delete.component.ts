import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-delete',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonDeleteComponent extends DButtonComponent {
    @Input() title = 'Delete the current item(s)';
    iconClass = 'fa fa-trash-o';
    buttonClass = 'btn-danger';
    text = 'Delete';
}
