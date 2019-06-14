import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-export',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonExportComponent extends DexihButtonComponent {
    @Input() title = 'Export the data';
    iconClass = 'fa fa-share-square-o';
    buttonClass = 'btn-primary';
    text = 'Export';
}
