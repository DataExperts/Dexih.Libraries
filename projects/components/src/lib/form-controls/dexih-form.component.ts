import { Component, forwardRef, Input } from '@angular/core';

@Component({
    selector: 'dexih-form',
    templateUrl: './dexih-form.component.html',
})
export class DexihFormComponent {
    @Input() formGroup: string;

    constructor() { }
}
