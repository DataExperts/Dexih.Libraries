import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-download',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonDownloadComponent extends DButtonComponent {
    @Input() title = 'Download the data';
    iconClass = 'fa fa-cloud-download';
    buttonClass = 'btn-primary';
    text = 'Download';
}
