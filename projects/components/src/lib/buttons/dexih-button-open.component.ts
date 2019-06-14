import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-open',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonOpenComponent extends DexihButtonComponent {
    @Input() title = 'View the current item details';
    iconClass = 'fa fa-folder-open-o';
    buttonClass = 'btn-info';
    text = 'Open';
}
