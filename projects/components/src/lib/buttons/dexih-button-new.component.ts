import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-new',
    templateUrl: './dexih-button.component.html',
    styleUrls: ['./dexih-button.component.scss']
})

export class DexihButtonNewComponent extends DexihButtonComponent {
    @Input() title = 'Create a new item';
    iconClass = 'fa fa-file-o';
    buttonClass = 'btn-primary';
    text = 'New';
}
