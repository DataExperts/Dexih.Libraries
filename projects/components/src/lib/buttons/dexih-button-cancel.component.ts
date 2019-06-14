import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-cancel',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonCancelComponent extends DexihButtonComponent {
    @Input() title = 'Cancel the current form';
    iconClass = 'fa fa-ban';
    buttonClass = 'btn-warning';
    text = 'Cancel';
}
