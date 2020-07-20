import { Component, forwardRef, Input } from '@angular/core';

@Component({
    selector: 'd-form',
    templateUrl: './form.component.html',
})
export class DFormComponent {
    @Input() formGroup: string;

    constructor() { }
}
