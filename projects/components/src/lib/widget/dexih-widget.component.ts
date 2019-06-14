import { Component, OnInit, Input, Output, ContentChild, TemplateRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'dexih-widget,div[dexihWidget]',
    templateUrl: './dexih-widget.component.html',
    styleUrls: ['./dexih-widget.component.scss'],
    animations: [
        // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [
        // route 'enter' transition
        transition(':enter', [
            // css styles at start of transition
            style({ opacity: 0 }),
            // animation and styles at end of transition
            animate('.3s', style({ opacity: 1 }))
        ]),
    ]),
    trigger('slideDown', [
        state('hide', style({ height: 0, overflow: 'hidden' })),
        state('show', style({ height: '*', overflow: 'unset' })),
        transition('hide <=> show', animate('200ms ease-in')),
    ]),
    trigger('slideInOut', [
        transition(':enter', [
          style({transform: 'translateY(-100%)'}),
          animate('200ms ease-in', style({transform: 'translateY(0%)'}))
        ]),
        transition(':leave', [
          animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
        ])
      ])
    ]
})
export class DexihWidgetComponent implements OnInit {
    @Input() public title: string;
    @Input() public subTitle: string;
    @Input() public iconClass: string;
    @Input() public headerClass = '';
    @Input() public subTitleClass = 'bg-light';
    @Input() public subHeaderClass = '';
    @Input() public bodyClass = '';
    @Input() public footerClass = '';
    @Input() public showIf = true;
    @Input() public loadingMessage = 'Loading...';
    @Input() public maxHeight: number;
    @Input() public showFilter = false;
    @Input() public showCloseButton = false;
    @Input() public padding = false;
    @Input() public showExpandButton = false;
    @Input() public isExpanded = true;

    @Output() public filterString = new EventEmitter<string>();

    @Output() close: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild('tools', { static: true }) toolsTemplate: TemplateRef<any>;
    @ContentChild('header', { static: true }) headerTemplate: TemplateRef<any>;
    @ContentChild('subTitle', { static: true }) subTitleTemplate: TemplateRef<any>;
    @ContentChild('subHeader', { static: true }) subHeaderTemplate: TemplateRef<any>;
    @ContentChild('footer', { static: true }) footerTemplate: TemplateRef<any>;

    filterControl = new FormControl();

    public state = 'open';

    constructor() {
    }

    ngOnInit() {
        // monitor changes to the filter control, and update if updated after 500ms.
        this.filterControl.valueChanges
            .pipe(debounceTime(500))
            .subscribe(newValue => {
                this.filterString.emit(newValue);
            });
    }

    doClose() {
        this.close.emit();
    }
}
