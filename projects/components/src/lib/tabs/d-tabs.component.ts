import { trigger, state, style, transition, animate, query, group } from '@angular/animations';
import { AfterContentInit, AfterViewInit, ContentChild, ContentChildren, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OutletContext } from '@angular/router';
import { DTabComponent } from './d-tab.component';

@Component({
    selector: 'd-tabs',
    templateUrl: 'd-tabs.component.html',
    styleUrls: ['./d-tabs.component.scss'],
    animations: [
        trigger('slideDown', [
            state('hide', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
            state('show', style({ height: '*', opacity: 1 })),
            transition('hide <=> show', animate('200ms ease-in')),
        ]),
    ]
})

export class DTabsComponent implements OnInit, OnChanges, AfterContentInit {
    @Input() public title: string;
    @Input() public subTitle: string;
    @Input() public subTitleClass = 'bg-light';
    @Input() public iconClass: string;
    @Input() public showExpandButton = false;
    @Input() public isExpanded = true;
    @Input() public sectionClass = '';
    @Input() public padding = true;
    @Input() public selectedIndex = 0;
    @Input() public tabStyle: 'pills' | 'tabs' | 'none' = 'pills';
    @Input() public showPrevNext = false;
    @Input() public activeStyle;
    @Input() public inActiveStyle = ''

    @Output() public selectedIndexChange = new EventEmitter<number>();

    @ContentChild('header', { static: true }) headerTemplate: TemplateRef<any>;
    @ContentChild('tools', { static: true }) toolsTemplate: TemplateRef<any>;
    @ContentChild('subTitle', { static: true }) subTitleTemplate: TemplateRef<any>;
    @ContentChildren(DTabComponent) tabs: QueryList<DTabComponent>;

    moveDirection = '';
    previousIndex: number;

    // the loading flag is used to stop ExpressionChangedAfterItHasBeenCheckedError
    // which is caused by the tabs being updated after the init but before afterContentInit.
    loading = true;

    constructor() { }

    ngOnInit() {
        this.previousIndex = this.selectedIndex;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedIndex) {
            if (this.previousIndex >= 0) {
                if (this.selectedIndex > this.previousIndex) {
                    this.moveDirection = 'left';
                }
                if (this.selectedIndex < this.previousIndex) {
                    this.moveDirection = 'right'
                }
            }

            this.previousIndex = this.selectedIndex;
        }
    }

    select(index: number) {

        if ( this.showExpandButton && this.selectedIndex === index) {
            this.isExpanded = !this.isExpanded;
        } else {
            this.isExpanded = true;
        }

        if(index < 0) { index = 0; }
        if(index >= this.tabs.length) { index = this.tabs.length -1; }

        if (index > this.selectedIndex) {
            this.moveDirection = 'left';
        }
        if (index < this.selectedIndex) {
            this.moveDirection = 'right'
        }

        this.selectedIndex = index;
        this.previousIndex = index;
        this.selectedIndexChange.emit(index);
    }

    ngAfterContentInit(): void {
        setTimeout(()=>{
            this.loading = false;
          });

    }
}
