import {Directive, OnInit, Input, HostBinding} from '@angular/core';
import {DexihBarComponent} from './dexih-bar.component';

const progressConfig = {
    animate: true,
    max: 100
};

@Directive({ selector: 'dexihProgress, [dexihProgress]' })
export class DexihProgressDirective implements OnInit {
    @Input() public animate: boolean;

    @HostBinding('attr.max')
    @Input() public get max(): number {
        return this._max;
    }

    @HostBinding('class') public addClass = 'progress';

    public set max(v: number) {
        this._max = v;
        this.bars.forEach((bar: DexihBarComponent) => {
            bar.recalculatePercentage();
        });
    }

    public bars: Array<any> = [];

    private _max: number;

    constructor() {
    }

    ngOnInit() {
        this.animate = this.animate !== false;
        this.max = typeof this.max === 'number' ? this.max : progressConfig.max;
    }


    public addBar(bar: DexihBarComponent) {
        if (!this.animate) {
            bar.transition = 'none';
        }
        this.bars.push(bar);
    }

    public removeBar(bar: DexihBarComponent) {
        this.bars.splice(this.bars.indexOf(bar), 1);
    }
}
