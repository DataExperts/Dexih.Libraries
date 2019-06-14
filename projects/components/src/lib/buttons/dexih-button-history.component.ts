import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-history',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonHistoryComponent extends DexihButtonComponent {
    @Input() title = 'Edit the current item';
    iconClass = 'fa fa-history';
    buttonClass = 'btn-primary';
    text = 'History';
}
