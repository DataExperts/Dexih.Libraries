import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-apply',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonApplyComponent extends DexihButtonComponent {
    @Input() title = 'Apply the current changes';
    iconClass = 'fa fa-check-circle';
    buttonClass = 'btn-primary';
    text = 'Apply';
}
