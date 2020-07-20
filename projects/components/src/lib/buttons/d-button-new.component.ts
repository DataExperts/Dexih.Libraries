import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-new',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonNewComponent extends DButtonComponent {
    @Input() title = 'Create a new item';
    iconClass = 'fa fa-file-o';
    buttonClass = 'btn-primary';
    text = 'New';
}
