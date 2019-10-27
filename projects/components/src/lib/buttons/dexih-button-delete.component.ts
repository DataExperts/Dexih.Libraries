import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-delete',
    templateUrl: './dexih-button.component.html',
    styleUrls: ['./dexih-button.component.scss']
})

export class DexihButtonDeleteComponent extends DexihButtonComponent {
    @Input() title = 'Delete the current item(s)';
    iconClass = 'fa fa-trash-o';
    buttonClass = 'btn-danger';
    text = 'Delete';
}
