import {
    AfterViewInit,
    Component,
    ContentChild,
    DoCheck,
    ElementRef,
    EventEmitter,
    Input,
    KeyValueDiffers,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Column, ColumnOperations, TableItem, Tag, TagState } from './dexih-table.models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'dexih-table',
    templateUrl: './dexih-table.component.html',
    styleUrls: [ './dexih-table.component.scss' ]
})
export class DexihTableComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    @Input() public dataObservable: Observable<Array<any>>;
    @Input() public data: Array<any>;
    @Input() public enableToolbar = true;
    @Input() public enableMultiSelect: boolean;
    @Input() public enableCellValue = true;
    @Input() public enableManualSort = false;
    @Input() public enableSort = true;
    @Input() public enableFilter = true;
    @Input() public filterString: string;
    @Input() public enableHeaderRow = true;
    @Input() public columns: Array<Column>;
    @Input() public sortColumn: string;
    @Input() public selectedItems: Array<any>;
    @Input() public keyColumn: string;
    @Input() public selectedKeyColumn: string;
    @Input() public enableSaveCsv = false;
    @Input() public csvFileName = 'data.csv';
    @Input() public enableResponsive = true;
    @Input() public tableClass = 'table table-striped table-bordered table-hover m-0';
    @Input() public error: string;
    @Input() public heading: string;
    @Input() public dropListEnterPredicate;
    @Input() public loadingMessage = 'Data is loading...';
    @Input() public hideTable = false;
    @Input() public rowStatusHeading = 'Status';
    @Input() public actionHeading = 'Action';
    @Input() public dropName = '';
    @Input() public enableViewToggle = true;
    @Input() public view: 'table' | 'cards' = 'table';
    @Input() public tags: Tag[];

    @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSelectedChange: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    @Output() public onSortChanged: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    @Output() public onDrop: EventEmitter<CdkDragDrop<string[]>> = new EventEmitter();
    @Output() onTagClick: EventEmitter<Tag> = new EventEmitter<Tag>();
    
    @ContentChild('rowAction', {static: true }) public rowActionTemplate: TemplateRef<any>;
    @ContentChild('rowStatus', {static: true }) public rowStatusTemplate: TemplateRef<any>;
    @ContentChild('selectedItemsAction', {static: true }) public selectedItemsActionsTemplate: TemplateRef<any>;
    @ContentChild('selectedItemAction', {static: true }) public selectedItemActionsTemplate: TemplateRef<any>;
    @ContentChild('actions', {static: true }) public actionsTemplate: TemplateRef<any>;
    @ContentChild('cell', {static: true }) public cellTemplate: TemplateRef<any>;
    @ContentChild('tableHeader', {static: true }) public tableHeaderTemplate: TemplateRef<any>;
    @ContentChild('filter', {static: true }) public filterTemplate: TemplateRef<any>;

    @ViewChild('cdkDropList', {static: true }) public cdkDropList: ElementRef;

    public filterControl = new FormControl();
    public sortDirection = 1;
    public manualSort = false;

    public currentSelectedItems: Array<any>;

    public tableItems: TableItem[] = [];
    public currentColumns: Column[];

    // array containing column number of expanded nodes in each row
    public expandedNodes: Array<number> = null;
    public tableColumns: number;

    public selectedItemsCount: number;
    public selectAllState: boolean;

    public columnCount = 1;
    public preventRowClick = false;

    private tableDataSubscription: Subscription;
    private filterSubscription: Subscription;
    private loadCompleted = false;
    private dataDiffer: any;
    private columnOperations = new ColumnOperations();

    public tagStates: TagState[];

    constructor(public el: ElementRef, public differs: KeyValueDiffers) {
        this.dataDiffer = differs.find({}).create();
    }

    ngOnInit() {
        this.currentSelectedItems = this.selectedItems;
        this.loadTableData();
        
        this.updateTags();
    }

    ngOnDestroy() {
        if (this.tableDataSubscription) { this.tableDataSubscription.unsubscribe(); }
        if (this.filterSubscription) { this.filterSubscription.unsubscribe(); }
    }

    ngOnChanges(changes: SimpleChanges) {
        
        if (this.columns) {
            this.columnCount = this.columns.length;
        } else if (this.data) {
            this.columnCount = this.data.keys.length;
        }

        if (this.enableMultiSelect) { this.columnCount++; }
        if (this.rowActionTemplate) { this.columnCount++; }
        if (this.rowStatusTemplate) { this.columnCount++; }
        if (this.enableManualSort) { this.columnCount++; }

        if (!this.dataObservable && this.data) {
            const changes = this.dataDiffer.diff(this.data); // check for changes

            // the data.length === 0 is checked also as dataDiffer doesn't detect from null to empty
            if (changes || (this.data && this.data.length === 0)) {
                this.doLoadData(this.data);
            }
        }

        this.updateTags();
    }

    ngAfterViewInit() {
        this.loadCompleted = true;
    }

    loadTableData() {
        // use the observable for loading the table as first preference.
        if (this.dataObservable) {
            if (this.tableDataSubscription) { this.tableDataSubscription.unsubscribe(); }
            this.tableDataSubscription = this.dataObservable.subscribe(data => {
                this.doLoadData(data);
            });
        } else {
            // otherwise load from the static data.
            this.doLoadData(this.data);
        }
    }

    doLoadData(data: Array<any>) {
        if (data) {
            this.data = data;
            this.expandedNodes = new Array(data.length);

            // console.debug(`key length ${data[0].keys.length}`);
            // if column formatting not specified, then create
            if (this.columns) {
                this.currentColumns = this.columns;
            } else {
                this.currentColumns = [];
                if (data.length > 0) {
                    const dataItem = data[0];
                    if (dataItem instanceof Array) {
                        const dataArray = <Array<any>>dataItem;
                        for (let i = 0; i < dataArray.length; i++) {
                            this.currentColumns.push(<Column>{ name: i, title: `[${i}]` });
                        }
                    } else {
                        const properties = Object.getOwnPropertyNames(data[0]);
                        properties.forEach(property => {
                            this.currentColumns.push(<Column>{ name: property, title: property });
                        });
                    }
                }
            }

            this.columnCount = this.currentColumns.length +
                (this.enableMultiSelect ? 1 : 0) +
                (this.enableManualSort ? 1 : 0) +
                (this.rowActionTemplate ? 1 : 0) +
                (this.rowStatusTemplate ? 1 : 0);


            // reset the tableItems array.
            this.tableItems = new Array(this.data.length);
            this.data.forEach((item, index) => {
                let isSelected = false;
                if (this.keyColumn && this.selectedItems) {
                    const keyValue = this.columnOperations.fetchFromObject(item, this.keyColumn);
                    const selectedKeyColumn = this.selectedKeyColumn ? this.selectedKeyColumn : this.keyColumn;
                    const selected = this.selectedItems
                        .findIndex(c => this.columnOperations.fetchFromObject(c, selectedKeyColumn) === keyValue);
                    isSelected = selected >= 0 ? true : false;
                }
                this.tableItems[index] = new TableItem(index, null, isSelected, false);
            });

            // update the data each time the source changes.
            this.updateFilter();


            // monitor changes to the filter control, and update if updated after 500ms.
            if (this.filterSubscription) { this.filterSubscription.unsubscribe(); }
            this.filterSubscription = this.filterControl.valueChanges
                .pipe(debounceTime(500))
                .subscribe(newValue => {
                    this.filterString = newValue;
                    this.updateFilter();
                });
        } else {
            this.data = null;
            this.tableItems = null;
        }
    }

    sort(sortColumn: string) {
        if (this.data) {
            this.manualSort = false;
            if (this.sortColumn === sortColumn) {
                if (this.sortDirection === 1) {
                    this.sortDirection = -1;
                } else {
                    this.sortColumn = null;
                    this.sortDirection = 1;
                }
            } else {
                this.sortColumn = sortColumn;
                this.sortDirection = 1;
            }
            this.updateFilter();
        }
    }

    manualSortChange(event: CdkDragDrop<string[]>) {
        if (event.container === event.previousContainer) {
            moveItemInArray(this.tableItems, event.previousIndex, event.currentIndex);

            const newData = new Array<any>();
            this.tableItems.forEach((tableItem, index) => {
                newData.push(this.data[tableItem.index]);
            });
            this.onSortChanged.emit(newData);
        } else {
            this.onDrop.emit(event);
        }
    }

    selectRowClick(row: any) {
        if (!this.preventRowClick) {
            // if there is a selection don't raise the event.
            const selection = window.getSelection();
            if (selection.type !== 'Range') {
                this.rowClick.emit(row);
            }
        }
        this.preventRowClick = false;

    }

    private updateFilter() {
        if (this.tableItems) {
            let selectedTags = this.tagStates ? this.tagStates.filter(c => c.isChecked) : [];
            if (this.filterString || selectedTags.length > 0 ) {
                let filter: string = null;
                if(this.filterString) {
                    filter = this.filterString.toLowerCase();
                }

                this.tableItems.forEach((row, index) => {
                    let isStringMatch = false;

                    // if there are any checkedTags then assume false, until we find a match
                    let isTagMatch = selectedTags.length > 0 ? false : true;
                    const dataRow = this.data[this.columnOperations.fetchFromObject(row, 'index')];
                    this.currentColumns.forEach(column => {

                        if (filter) {
                            const columnNameValue = this.columnOperations.fetchFromObject(dataRow, column.name);
                            const columnFooterValue = this.columnOperations.fetchFromObject(dataRow, column.footer);
                            const columnHeaderValue = this.columnOperations.fetchFromObject(dataRow, column.header);
                            if ((columnNameValue != null && String(columnNameValue).toLowerCase().includes(filter)) ||
                                (columnFooterValue != null && String(columnFooterValue).toLowerCase().includes(filter)) ||
                                (columnHeaderValue != null && String(columnHeaderValue).toLowerCase().includes(filter))) {
                                isStringMatch = true;
                            }
                        } else {
                            isStringMatch = true;
                        }
                    });

                    let tagColumn = this.currentColumns.find(c => c.tags);
                    // check if the tags are filtered.
                    if (this.tagStates && selectedTags.length > 0 && tagColumn.tags && tagColumn.tags.length > 0) {
                        let columnTags = this.columnOperations.fetchFromObject(dataRow, tagColumn.tags);
                        if(columnTags) {
                            for(let tag of columnTags) {
                                if (selectedTags.findIndex(c => c.tag.name === tag.name) >= 0) {
                                    isTagMatch = true;
                                    break;
                                }
                            }
                        } 
                    } 

                    this.tableItems[index].isFiltered = !isStringMatch || !isTagMatch;
                });
            } else {
                this.tableItems.forEach(item => item.isFiltered = false);
            }

            if (this.sortColumn) {
                // add the sorted value to each of the table items.
                this.tableItems.forEach(item => item.sortValue =
                        this.columnOperations.fetchFromObject(this.data[item.index], this.sortColumn));
            } else {
                // GH - commented as it causes change in the manual reordering.  Not sure if has other impacts.
                // if no sort column, sort to original order
                // this.tableItems.forEach(item => item.sortValue = item.index);
            }

            this.tableItems = this.tableItems.sort((a, b) => {
                const result = (a.sortValue < b.sortValue) ? -1 : (a.sortValue > b.sortValue) ? 1 : 0;
                return result * this.sortDirection;
            });

            this.itemSelected(false);
        }
    }

    itemSelected(raiseEvent = false) {
        if (this.data) {
            this.selectedItemsCount = this.tableItems.filter(t => t.isSelected === true).length;
            this.currentSelectedItems = [];
            this.tableItems.filter(t => t.isSelected && !t.isFiltered).forEach(item => {
                this.currentSelectedItems.push(this.data[item.index]);
            });
        } else {
            this.selectedItemsCount = 0;
            this.currentSelectedItems = [];
        }

        if (this.loadCompleted && raiseEvent) {
            this.onSelectedChange.emit(this.currentSelectedItems);
        }
    }

    selectAll(event: any) {
        this.tableItems.filter(c => !c.isFiltered).forEach(item => item.isSelected = this.selectAllState);
        this.itemSelected(true);
    }

    public saveCsv() {
        // create a header row.
        let csvContent = this.currentColumns.map(c => '"' + c.title + '"').join(',') + '\n';

        this.data.forEach(row => {
            csvContent += this.processRow(row);
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, this.csvFileName);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', this.csvFileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    public toggleView() {
        if (this.view === 'table' ) {
            this.view = 'cards';
        } else {
            this.view = 'table'
        }
    }

    private processRow(row: any): string {
        const finalVal = '';

        return this.currentColumns.map(column => {
            const value = this.columnOperations.fetchFromObject(row, column.name);
            let formattedValue = this.columnOperations.formatValue(column, value);

            if (typeof(formattedValue) === 'string') {
                formattedValue = '"' + formattedValue + '"';
            }

            if (formattedValue instanceof String) {
                let result = formattedValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0) {
                    result = '"' + result + '"';
                }
                return result;
            } else {
                return formattedValue;
            }
        }).join(',') + '\n';
    }

    public nodeClick(row: number, column: number) {
        this.preventRowClick = true;

        if (this.expandedNodes[row] === column) {
            this.expandedNodes[row] = -1;
        } else {
            this.expandedNodes[row] = column;
        }
    }

    public nodeClose(row: number) {
        this.preventRowClick = true;
        this.expandedNodes[row] = -1;
    }

    public tagClick(tag: Tag) {
        if(this.tagStates) {
            let tagState = this.tagStates.find(c => c.tag.name === tag.name);
            if (tagState) {
                tagState.isChecked = !tagState.isChecked;
            }
            
            this.tagStates.forEach(c => {
                if(c.tag.name != tag.name) {
                    c.isChecked = false;
                }
            });

            this.updateFilter();
        }

        this.onTagClick.emit(tag);
        event.stopPropagation();
    }

    public updateTags() {
        if(this.tags) {
            this.tagStates = new Array(this.tags.length);
            for (let i = 0; i < this.tagStates.length; i++) {
                let tag = this.tags[i];
                this.tagStates[i] = new TagState();
                this.tagStates[i].tag = tag;
                this.tagStates[i].isChecked = false;
            }
        }
    }

    clearTags() {
        this.tagStates.forEach(c => c.isChecked = false);
        this.updateFilter();
    }

    changeTags() {
        this.updateFilter();
    }

}


