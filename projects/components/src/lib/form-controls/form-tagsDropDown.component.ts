import { Component, forwardRef, Input, EventEmitter, Output, HostListener, ViewChild, OnChanges, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { SharedFunctions, ListItem } from './shared-functions';


@Component({
    selector: 'form-tags-dropdown',
    templateUrl: './form-tagsDropdown.component.html',
    styleUrls: ['../dexih-dropdown.scss', './form.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DFormTagsDropdownComponent), multi: true },
    ]
})
export class DFormTagsDropdownComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() placeholder: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() showErrorMessage = true;
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
    @Input() disabled = false;
    @Input() floatingLabel: string;

    @Input() showRefresh = false;
    @Input() isRefreshing = false;

    @Input() isOpen = false;
    @Input() autoClose = true;
    @Input() autoValidate = true;

    @Output() onRefresh = new EventEmitter();
    @Output() onShown = new EventEmitter();
    @Output() isOpenChange = new EventEmitter<any>();

    @ViewChild('dropdownButton', { static: true }) dropdownElement: any;

    isDirty = false;

    tag: string;
    id = 'input_' + Math.random().toString(36).substr(2, 9);

    tags: any[] = [];
    selectedKeys: any[];  // list of selected keys

    sortedItems: Array<ListItem>;
    sharedFunctions = new SharedFunctions();

    private blockMenuClose = false;

    // control is only used to control disabled
    control: FormControl;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }

    ngOnInit() {
        this.control = new FormControl({value: '', disabled: this.disabled});
        this.writeValue(this.value);
    }

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

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }

    getItems() {
        if (!this.itemKey || (this.itemKey && this.returnKeys)) {
            return this.selectedKeys;
        } else {
            if(this.selectedKeys && this.sortedItems) {
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
                const aLabel = this.sharedFunctions.fetchFromObject(a, this.itemName);
                const bLabel = this.sharedFunctions.fetchFromObject(b, this.itemName);
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
        if (this.selectedKeys && this.sortedItems) {
            this.selectedKeys.forEach(item => {
                const itemLookup = this.sortedItems.find(c => c.key === item);

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

        this.dropdownHide();
    }

    dropdownShow() {
        this.isOpen = true;
        this.isOpenChange.emit();
    }

    dropdownHide(delay = 500) {
        setTimeout(() => {
            if (!this.blockMenuClose) {
                this.isOpen = false;
                this.isOpenChange.emit();
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
        if (!this.sortedItems) { return; }
        
        this.selectedKeys = this.sortedItems.map(c => c.key);
        this.tags = this.sortedItems.map(c => { return {label: c.label, color: c.color}});
        this.hasChanged();
        this.dropdownHide();
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

    dropdownToggle($event) {
        this.isOpen = !this.isOpen;    
        this.isOpenChange.emit($event);  
        if(this.isOpen) {
            this.onShown.emit();
        }  
    }

    // detect a click outside the control, and hide the dropdown
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: any) {
        if (this.isOpen && this.autoClose) {
            const clickedInside = this.dropdownElement.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.isOpen = false;
            }
        }
    }
}
