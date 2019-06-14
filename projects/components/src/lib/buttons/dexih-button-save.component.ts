import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-save',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonSaveComponent extends DexihButtonComponent {
    @Input() title = 'Save the current changes';
    iconClass = 'fa fa-cloud-download';
    buttonClass = 'btn-primary';
    text = 'Save';
}
