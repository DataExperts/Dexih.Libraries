import { Component, Input } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-chart',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonChartComponent extends DButtonComponent {
    @Input() title = 'Toggle Chart';
    iconClass = 'fa fa-bar-chart';
    buttonClass = 'btn-primary';
    text = 'Chart';
}
