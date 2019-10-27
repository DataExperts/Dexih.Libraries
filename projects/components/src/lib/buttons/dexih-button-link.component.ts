import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-link',
    templateUrl: './dexih-button.component.html',
    styleUrls: ['./dexih-button.component.scss']
})

export class DexihButtonLinkComponent extends DexihButtonComponent {
    buttonClass = 'btn btn-link mb-1 p-0';

}
