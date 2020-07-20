import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-save-local',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonSaveLocalComponent extends DButtonComponent {
    @Input() title = 'Export to a local save file.';
    iconClass = 'fa fa-floppy-o';
    buttonClass = 'btn-primary';
    text = 'Save Locally';
}
