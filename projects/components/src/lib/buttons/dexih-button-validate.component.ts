import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-validate',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonValidateComponent extends DexihButtonComponent {
    @Input() title = 'Validate the current form';
    iconClass = 'fa fa-check-square-o';
    buttonClass = 'btn-success';
    text = 'Validate';
}
