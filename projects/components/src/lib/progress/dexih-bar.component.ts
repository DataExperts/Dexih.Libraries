import {Component, OnInit, OnDestroy, Input, Host} from '@angular/core';
import {DexihProgressDirective} from './dexih-progress.directive';

@Component({
    selector: 'dexih-bar, [dexih-bar]',
    templateUrl: './dexih-bar.component.html'
})
export class DexihBarComponent implements OnInit, OnDestroy {
    @Input() public type: string;
    @Input() public max: number;
    @Input() public height: number;
    @Input() public get value(): number {
        return this._value;
    }

    public set value(v: number) {
        if (!v && v !== 0) {
            return;
        }
        this._value = v;
        this.recalculatePercentage();
    }

    public percent = 0;
    public transition: string;

    private _value: number;

    constructor(@Host() public progress: DexihProgressDirective) {
    }

    ngOnInit() {
        this.progress.addBar(this);
    }

    ngOnDestroy() {
        this.progress.removeBar(this);
    }

    public recalculatePercentage() {
        this.percent = +(100 * this.value / this.progress.max).toFixed(2);

        let totalPercentage = this.progress.bars.reduce(function (total, bar) {
            return total + bar.percent;
        }, 0);

        if (totalPercentage > 100) {
            this.percent -= totalPercentage - 100;
        }
    }
}
