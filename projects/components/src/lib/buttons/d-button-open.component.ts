import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-open',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonOpenComponent extends DButtonComponent {
    @Input() title = 'View the current item details';
    iconClass = 'fa fa-folder-open-o';
    buttonClass = 'btn-info';
    text = 'Open';
}
