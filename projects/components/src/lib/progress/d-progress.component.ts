import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector: 'd-progressbar, [d-progressbar]',
    templateUrl: './d-progress.component.html',
    styleUrls: [ './d-progress.component.scss']
})
export class DProgressbarComponent implements OnChanges  {
    @Input() public max = 100;
    @Input() public type: 'success' | 'info' | 'primary' | 'danger';
    @Input() public value: number;
    @Input() public width = '200px';
    @Input() public height = '30px';
    @Input() public showCancel = false;
    @Input() public title = 'Progress';

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
