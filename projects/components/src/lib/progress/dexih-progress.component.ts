
import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector: 'dexih-progressbar, [dexih-progressbar]',
    templateUrl: './dexih-progress.component.html',
    styleUrls: [ './dexih-progress.component.scss']
})
export class DexihProgressbarComponent implements OnChanges  {
    @Input() public max = 100;
    @Input() public type: string;
    @Input() public value: number;
    @Input() public width = '200px';
    @Input() public height = '31px';
    @Input() public showCancel = false;

    @Output() cancelled = new EventEmitter();
    @Output() progressClick = new EventEmitter();

    public percent: number;

    ngOnChanges(simpleChanges: SimpleChanges) {
        this.percent = +(100 * this.value / this.max).toFixed(2);
    }

    onClick()     {
        this.progressClick.emit();
    }

    cancelClick() {
        this.cancelled.emit();
        event.stopPropagation();

    }

}
