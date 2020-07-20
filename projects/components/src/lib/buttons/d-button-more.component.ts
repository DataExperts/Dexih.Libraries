import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonDropDownComponent} from './d-button-dropdown.component';
@Component({
    selector: 'd-button-more',
    templateUrl: './d-button-dropdown.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonMoreComponent extends DButtonDropDownComponent {
    @Input() title = 'More options';
    iconClass = 'fa fa-bars';
    buttonClass = 'btn-info';
    text = 'More';
}
