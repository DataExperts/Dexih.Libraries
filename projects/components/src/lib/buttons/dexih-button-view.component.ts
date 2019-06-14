import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-view',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonViewComponent extends DexihButtonComponent {
    @Input() title = 'View the current item';
    iconClass = 'fa fa-binoculars';
    buttonClass = 'btn-primary';
    text = 'View';
}
