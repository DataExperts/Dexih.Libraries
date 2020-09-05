import { Component, Input } from '@angular/core';
import { DButtonComponent} from './d-button.component';
@Component({
    selector: 'd-button-cancel',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonCancelComponent extends DButtonComponent {
    @Input() title = 'Cancel the current form';
    iconClass = 'fa fa-ban';
    buttonClass = 'btn-danger';
    text = 'Cancel';
}
