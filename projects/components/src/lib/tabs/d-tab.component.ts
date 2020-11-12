import { ContentChild, ContentChildren, Directive, Input, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'd-tab',
    templateUrl: './d-tab.component.html'
})
export class DTabComponent implements OnInit {
    @Input() public title: string;
    @Input() public iconClass: string;
    @Input() public sectionClass = 'text-white bg-info';
    @Input() public padding = true;

    @ViewChild('innerTemplate') public innerTemplate: TemplateRef<any>;

    constructor() { }

    ngOnInit() { }
}