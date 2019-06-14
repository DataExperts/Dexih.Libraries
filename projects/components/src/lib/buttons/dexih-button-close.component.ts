import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-close',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonCloseComponent extends DexihButtonComponent {
    @Input() title = 'Close this window';
    iconClass = 'fa fa-close';
    buttonClass = 'btn-warning';
    text = 'Close';
}
