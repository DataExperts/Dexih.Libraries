import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-private',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonPrivateComponent extends DButtonComponent {
    @Input() title = 'Set selected items to private';
    iconClass = 'fa fa-user-secret';
    buttonClass = 'btn-warning';
    text = 'Private';
}
