import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-private',
    templateUrl: './dexih-button.component.html',
    styleUrls: ['./dexih-button.component.scss']
})

export class DexihButtonPrivateComponent extends DexihButtonComponent {
    @Input() title = 'Set selected items to private';
    iconClass = 'fa fa-user-secret';
    buttonClass = 'btn-warning';
    text = 'Private';
}
