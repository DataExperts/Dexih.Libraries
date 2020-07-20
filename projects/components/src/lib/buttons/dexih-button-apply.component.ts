import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-apply',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonApplyComponent extends DButtonComponent {
    @Input() title = 'Apply the current changes';
    iconClass = 'fa fa-check-circle';
    buttonClass = 'btn-primary';
    text = 'Apply';
}
