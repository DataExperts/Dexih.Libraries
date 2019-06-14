import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonDropDownComponent} from './dexih-button-dropdown.component';
@Component({
    selector: 'dexih-button-more',
    templateUrl: './dexih-button-dropdown.component.html'
})

export class DexihButtonMoreComponent extends DexihButtonDropDownComponent {
    @Input() title = 'More options';
    iconClass = 'fa fa-bars';
    buttonClass = 'btn-info';
    text = 'More';
}
