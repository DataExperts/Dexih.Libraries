import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-refresh',
    templateUrl: './dexih-button.component.html',
    styleUrls: ['./dexih-button.component.scss']
})

export class DexihButtonRefreshComponent extends DexihButtonComponent {
    @Input() title = 'Refresh the items';
    iconClass = 'fa fa-refresh';
    buttonClass = 'btn-primary';
    text = 'Refresh';
}
