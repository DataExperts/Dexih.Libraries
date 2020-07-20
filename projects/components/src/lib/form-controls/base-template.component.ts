import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'base-template',
    templateUrl: 'base-template.component.html',
    styleUrls: ['./form.component.scss'],
})

export class BaseTemplateComponent {
    @Input() id: string;
    @Input() label: string;
    @Input() subLabel: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() border = true;

    @ContentChild('labelContent', {static: true }) public labelContentTemplate: TemplateRef<any>;

    sharedFunctions = new SharedFunctions();
    constructor() { }
}