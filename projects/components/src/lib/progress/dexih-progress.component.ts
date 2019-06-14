
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'dexih-progressbar, [dexih-progressbar]',
    templateUrl: './dexih-progress.component.html',
    styleUrls: [ './dexih-progress.component.scss']
})
export class DexihProgressbarComponent  {
    @Input() public animate: boolean;
    @Input() public max = 100;
    @Input() public type: string;
    @Input() public value: number;
    @Input() public width = '200px';
    @Input() public height = '31px';
    @Input() public showCancel = false;

    @Output() cancelled = new EventEmitter();
    @Output() progressClick = new EventEmitter();

    onClick()     {
        this.progressClick.emit();
    }

    cancelClick() {
        this.cancelled.emit();
        event.stopPropagation();

    }

}
