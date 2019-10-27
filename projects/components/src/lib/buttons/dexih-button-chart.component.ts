import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-chart',
    templateUrl: './dexih-button.component.html',
    styleUrls: ['./dexih-button.component.scss']
})

export class DexihButtonChartComponent extends DexihButtonComponent {
    @Input() title = 'Toggle Chart';
    iconClass = 'fa fa-bar-chart';
    buttonClass = 'btn-primary';
    text = 'Chart';
}
