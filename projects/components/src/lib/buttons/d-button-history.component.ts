import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-history',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonHistoryComponent extends DButtonComponent {
    @Input() title = 'Edit the current item';
    iconClass = 'fa fa-history';
    buttonClass = 'btn-primary';
    text = 'History';
}
