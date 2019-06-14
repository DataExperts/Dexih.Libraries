import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-share',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonShareComponent extends DexihButtonComponent {
    @Input() title = 'Share the selected items';
    iconClass = 'fa fa-group';
    buttonClass = 'btn-primary';
    text = 'Share';
}
