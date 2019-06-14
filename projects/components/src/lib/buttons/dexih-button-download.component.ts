import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-download',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonDownloadComponent extends DexihButtonComponent {
    @Input() title = 'Download the data';
    iconClass = 'fa fa-cloud-download';
    buttonClass = 'btn-primary';
    text = 'Download';
}
