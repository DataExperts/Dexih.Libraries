import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Column, ColumnOperations, Tag } from './dexih-table.models';
import { strictEqual } from 'assert';


@Component({
    selector: 'dexih-table-cell',
    templateUrl: 'dexih-table-cell.component.html',
    styleUrls: [ './dexih-table-cell.component.scss' ]
})

export class DexihTableCellComponent implements OnInit, OnDestroy {
    @Input() public column: Column;
    @Input() public row: any;
    @Input() public nodeExpanded = -1;
    @Output() onNodeClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() onTagClick: EventEmitter<Tag> = new EventEmitter<Tag>();

    private _interval: any;

    public value: any;
    public jsonValue: any;
    public formattedValue: string;
    public alignment: string;
    public footer: string;
    public header: string;
    public format: string;
    public tags: Tag[];

    private columnOperations = new ColumnOperations();

    public showChild = -1;

    constructor() { }

    ngOnInit() {
        this.format = this.column.format;
        if (this.column.name || this.column.name === 0) {
            this.value = this.columnOperations.fetchFromObject(this.row, this.column.name);
            this.footer = this.columnOperations.fetchFromObject(this.row, this.column.footer);
            this.header = this.columnOperations.fetchFromObject(this.row, this.column.header);
            this.tags = this.columnOperations.fetchFromObject(this.row, this.column.tags);
            this.formattedValue = this.columnOperations.formatValue(this.column, this.value);
            this.alignment = this.setAlignment(this.value)

            // if (typeof this.value === 'object' || this.value instanceof Array) {
            //     this.value
            //     const json = JSON.stringify(this.value, null, 2);
            //     this.jsonValue = this.syntaxHighlight(json);
            //     this.format = 'Json';
            // }

            if (this.column.format === 'Json') {
                let json: string;
                if(typeof this.value === 'string') {
                    if (this.value) {
                        json = JSON.stringify(JSON.parse(this.value), null, 2);
                    } else {
                        json = '';
                    }
                } else {
                    json = JSON.stringify(this.value, null, 2);
                }
                this.jsonValue = this.syntaxHighlight(json);   
            }

            if (this.column.format === 'Countdown') {
                this._startTimer();
            }

        } else {
            this.value = '';
        }
    }

    /// found at https://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
    syntaxHighlight(json: string) {
        if(!json) { return null; }
        
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    ngOnDestroy() {
        if (this._interval) {
            this._stopTimer();
        }
    }

    private _startTimer() {
        this._stopTimer();
        this._interval = setInterval(() => {
            if (this.value instanceof Date) {
                this.formattedValue = this.columnOperations.countDown(this.value);
            } else {
                this.formattedValue = this.columnOperations.countDown(new Date(this.value));
            }
        }, 1000);
    }

    private _stopTimer() {
        clearInterval(this._interval);
        this._interval = undefined;
    }


    setAlignment(value: any): string {
        if (this.format === 'Date' ||
            this.format === 'Time' ||
            this.format === 'DateTime' ||
            value instanceof Date ||
            this.isNumeric(value)
        ) {
            return 'right';
        } else if (this.format === 'Boolean') {
            return 'center';
        }

        return '';
    }

    isNumeric(n: any): boolean {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    expand() {
        this.onNodeClick.emit();
    }

    collapse() {
        this.onNodeClick.emit();
    }

    tagClick(tag: Tag) {
        this.onTagClick.emit(tag);
    }

    getRoute(event: any) {
        let element = event.target;
        while (element) {
            let link: string = element.getAttribute('href');
            if (link && (link.startsWith('http://') || link.startsWith('https://'))) {
                window.open(link);
            }
            event.preventDefault();
            element = element.parentElement;
        }
    }
}

