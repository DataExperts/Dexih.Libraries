import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-export',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonExportComponent extends DButtonComponent {
    @Input() title = 'Export the data';
    iconClass = 'fa fa-share-square-o';
    buttonClass = 'btn-primary';
    text = 'Export';
}
