import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'base-template',
    templateUrl: 'base-template.component.html',
    styleUrls: ['./dexih-form.component.scss'],
})

export class BaseTemplateComponent {
    @Input() label: string;
    @Input() subLabel: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() border = true;

    @ContentChild('labelContent', {static: true }) public labelContentTemplate: TemplateRef<any>;

    constructor() { }
}