import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-save',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonSaveComponent extends DButtonComponent {
    @Input() title = 'Save the current changes';
    iconClass = 'fa fa-cloud-download';
    buttonClass = 'btn-primary';
    text = 'Save';
}
