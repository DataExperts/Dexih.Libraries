import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-refresh',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonRefreshComponent extends DButtonComponent {
    @Input() title = 'Refresh the items';
    iconClass = 'fa fa-refresh';
    buttonClass = 'btn-primary';
    text = 'Refresh';
}
