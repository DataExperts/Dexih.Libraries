import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-edit',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonEditComponent extends DexihButtonComponent {
    @Input() title = 'Edit the current item';
    iconClass = 'fa fa-edit';
    buttonClass = 'btn-primary';
    text = 'Edit';
}
