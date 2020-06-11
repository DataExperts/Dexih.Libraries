import { Component, forwardRef, Input, EventEmitter, Output, HostListener, ViewChild, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { SharedFunctions, ListItem } from './shared-functions';


@Component({
    selector: 'form-tags-dropdown',
    templateUrl: './dexih-form-tagsDropdown.component.html',
    styleUrls: ['./dexih-form.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormTagsDropdownComponent), multi: true },
    ]
})
export class DexihFormTagsDropdownComponent implements ControlValueAccessor, OnChanges {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() placeholder: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: Array<any> = [];
    @Input() type = 'text';
    @Input() subLabel: string;
    @Input() maxlength: number;
    @Input() items: Array<any>;
    @Input() itemKey: any;
    @Input() itemName: string;
    @Input() itemColor: string;
    @Input() itemTitle: string;
    @Input() sortItems = false;
    @Input() border = true;
    @Input() enableAddAll = false;
    @Input() returnKeys = true;

    @Input() showRefresh = false;
    @Input() isRefreshing = false;
    @Output() onRefresh = new EventEmitter();

    @Output() onShown = new EventEmitter();

    @ViewChild(BsDropdownDirective, { static: true }) dropdown: BsDropdownDirective;
    @ViewChild('dropdown', { static: true }) dropdownElement: any;

    isDirty = false;

    tag: string;
    id = 'input_' + Math.random().toString(36).substr(2, 9);

    tags: any[] = [];
    selectedKeys: any[];  // list of selected keys

    sortedItems: Array<ListItem>;
    sharedFunctions = new SharedFunctions();

    private blockMenuClose = false;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }

    ngOnChanges() {
       // this.updateLabels();
        this.writeValue(this.getItems());
    }

    hasChanged() {
        this.onChange(this.getItems());
        this.onTouched();
        this.isDirty = true;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: string[]) {
        if (value) {
            if (this.itemKey) {
                if (this.returnKeys) {
                    this.selectedKeys = value;
                } else {
                    this.selectedKeys = value.map(c => this.sharedFunctions.fetchFromObject(c, this.itemKey)).filter(c => c !== null);
                }
            } else {
                this.selectedKeys = value;
            }
        } else {
            this.selectedKeys = value;
        }

        this.updateLabels();
    }

    getItems() {
        if (!this.itemKey || (this.itemKey && this.returnKeys)) {
            return this.selectedKeys;
        } else {
            if(this.selectedKeys) {
                return this.selectedKeys.map(key => this.sortedItems.find(c => c.key === key).item);
            } else {
                return [];
            }
        }
    }

    updateLabels() {

        let items: Array<any>;
        if (this.sortItems) {
            items = this.items.sort((a, b) => {
                let aLabel = this.sharedFunctions.fetchFromObject(a, this.itemName);
                let bLabel = this.sharedFunctions.fetchFromObject(b, this.itemName);
                if (aLabel > bLabel) {
                    return 1;
                }
                if (aLabel < aLabel) {
                    return -1;
                }
                return 0;
            });
        } else {
            items = this.items;
        }

        this.sortedItems = items.map(c => {
            return {
                label: this.sharedFunctions.fetchFromObject(c, this.itemName),
                color: this.itemColor ? this.sharedFunctions.fetchFromObject(c, this.itemColor) : null,
                key: this.sharedFunctions.fetchFromObject(c, this.itemKey),
                title: this.sharedFunctions.fetchFromObject(c, this.itemTitle),
                item: c
            };
        });

        this.tags = [];
        if (this.selectedKeys) {
            this.selectedKeys.forEach(item => {
                let itemLookup = this.sortedItems.find(c => c.key === item);

                if (itemLookup) {
                    this.tags.push({label: itemLookup.label, color: itemLookup.color});
                }
            });
        }
    }

    selectItem(selectedItem: ListItem) {
        if (selectedItem) {
            if (!this.selectedKeys) { this.selectedKeys = []; }

            // if the item already selected, then do nothing
            if(this.selectedKeys.findIndex(c => c === selectedItem.key) >= 0) {
                return;
            }

            this.selectedKeys.push(selectedItem.key);
            this.tags.push({label: selectedItem.label, color: selectedItem.color});
        }

        this.onChange(this.getItems());
        this.onTouched();
        this.isDirty = true;

        this.dropdown.hide();
    }

    dropdownShow() {
        this.dropdown.show();
    }

    dropdownHide(delay = 500) {
        setTimeout(() => {
            if (!this.blockMenuClose) {
                this.dropdown.hide();
            }
            this.blockMenuClose = false;
        },
        delay);
    }

    remove(index: number) {
        if (index >= 0 && this.selectedKeys) {
            this.selectedKeys.splice(index, 1);
            this.tags.splice(index, 1);
            this.hasChanged();
        }
    }

    addAll() {
        this.selectedKeys = this.sortedItems.map(c => c.key);
        this.tags = this.sortedItems.map(c => { return {label: c.label, color: c.color}});
        this.hasChanged();
        this.dropdown.hide();
    }

    clearAll() {
        this.selectedKeys = [];
        this.tags = [];
        this.hasChanged();
    }

    refresh() {
        this.blockMenuClose = true;
        this.onRefresh.emit();
    }

    shown() {
        this.onShown.emit();
    }

    // detect a click outside the control, and hide the dropdown
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: any) {
        if (this.dropdown.isOpen) {
            const clickedInside = this.dropdownElement.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.dropdown.hide();
            }
        }
    }
}
