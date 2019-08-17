import { Component, forwardRef, Input, EventEmitter, Output, HostListener, ViewChild, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { SharedFunctions, ListItem } from './shared-functions';

@Component({
    selector: 'form-tags-dropdown',
    templateUrl: './dexih-form-tagsDropdown.component.html',
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
    @Input() value: Array<string> = [];
    @Input() type = 'text';
    @Input() subLabel: string;
    @Input() maxlength: number;
    @Input() items: Array<any>;
    @Input() itemKey: any;
    @Input() itemName: string;
    @Input() itemTitle: string;
    @Input() sortItems = false;
    @Input() border = true;
    @Input() enableAddAll = false;
    @Input() returnKeys = false;

    @ViewChild(BsDropdownDirective, { static: true }) dropdown: BsDropdownDirective;
    @ViewChild('dropdown', { static: true }) dropdownElement: any;

    isDirty = false;

    tag: string;
    id = 'input_' + Math.random().toString(36).substr(2, 9);

    labels: string[] = [];
    selectedItems: any[];

    sortedItems: Array<ListItem>;
    sharedFunctions = new SharedFunctions();

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
                this.selectedItems = value.map(c => this.items.find(i => i[this.itemKey] === c)).filter(c => c);
            } else {
                this.selectedItems = value;
            }
        } else {
            this.selectedItems = value;
        }

        this.updateLabels();
    }

    getItems() {
        if (this.itemKey) {
            if (this.selectedItems) {
                return this.selectedItems.map(c => c[this.itemKey]).filter(c => c);
            } else {
                return null;
            }
        } else {
            return this.selectedItems;
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
                key: this.sharedFunctions.fetchFromObject(c, this.itemKey),
                title: this.sharedFunctions.fetchFromObject(c, this.itemTitle),
                item: c
            };
        });

        this.labels = [];
        if (this.selectedItems) {
            this.selectedItems.forEach(item => {
                let itemLookup: string;
                if (this.returnKeys) {
                    itemLookup = this.items.find(c => this.sharedFunctions.fetchFromObject(c, this.itemKey) === item);
                } else {
                    itemLookup = this.items.find(c => this.sharedFunctions.fetchFromObject(c, this.itemKey)
                        === this.sharedFunctions.fetchFromObject(item, this.itemKey));
                }

                if (itemLookup) {
                    this.labels.push(this.sharedFunctions.fetchFromObject(itemLookup, this.itemName));
                } else {
                    this.labels.push(item);
                }
            });
        }
    }

    selectItem(selectedItem: ListItem) {
        if (selectedItem) {
            let item: any;
            if (!this.selectedItems) { this.selectedItems = []; }
            item = this.selectedItems.find(c => this.sharedFunctions.fetchFromObject(c, this.itemKey) === selectedItem.key);
            if (this.returnKeys) {
                item = this.sharedFunctions.fetchFromObject(item, this.itemKey);
            }
            if (item) { return; }
            this.selectedItems.push(selectedItem.item);
            this.labels.push(selectedItem.label);
        }

        this.onChange(this.getItems());
        this.onTouched();
        this.isDirty = true;

        this.dropdown.hide();
    }

    remove(index: number) {
        if (index >= 0 && this.selectedItems) {
            this.selectedItems.splice(index, 1);
            this.labels.splice(index, 1);
            this.hasChanged();
        }
    }

    addAll() {
        if (this.returnKeys) {
            this.selectedItems = this.sortedItems.map(c => c.key);
        } else {
            this.selectedItems = this.sortedItems.map(c => c.item);
        }

        this.labels = this.sortedItems.map(c => c.label);
        this.hasChanged();
        this.dropdown.hide();
    }

    clearAll() {
        this.selectedItems = [];
        this.labels = [];
        this.hasChanged();
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
