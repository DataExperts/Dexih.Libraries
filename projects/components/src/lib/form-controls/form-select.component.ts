import { Component, OnInit, OnChanges, OnDestroy, forwardRef, Input, Output,
    ViewChild, HostListener, EventEmitter, SimpleChanges, ContentChild, TemplateRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-select',
    templateUrl: './form-select.component.html',
    styleUrls: ['../dexih-dropdown.scss', './form.component.scss'],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DFormSelectComponent), multi: true }]
})
export class DFormSelectComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    @Input() label: string;
    @Input() subLabel: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() showErrorMessage = true;
    @Input() maxlength: number;
    @Input() disabled = false;
    @Input() value: any = null;
    @Input() iconClass: string; // only displays where there are no elements.
    @Input() items: Array<any>;
    @Input() parentName: string;
    @Input() grandParentName: string;
    @Input() childItems: string;
    @Input() grandChildItems: string;
    @Input() itemKey: string;
    @Input() itemName: string;
    @Input() itemTitle: string;
    @Input() defaultItem: string; // item is added to the list when list is empty.
    @Input() allowNullSelect = false;
    @Input() selectNullMessage = 'Select null';
    @Input() allowBlankSelect = false;
    @Input() selectBlankMessage = 'Select blank';
    @Input() enableTextEntry = false; // allows text to be entered in addition to selected entries.
    @Input() enableTextEntryMatch = true; // keeps text entry in sync with the value variable.
    @Input() enableKeySelect = true; // the output value will be the key field (rather than the item value)
    @Input() textEntryItems: string[] = [];
    @Input() textEntryItemsTitle: string;
    @Input() textEntryNote = 'Enter a value';
    @Input() disabledNote = 'There are no items available for selection.';
    @Input() textValue: string = null;
    @Input() border = true;
    @Input() sortItems = false;
    @Input() enableFilter = true;
    @Input() autocapitalize = false;
    @Input() multiSelect = false;
    @Input() enableAddAll = false;
    @Input() enableRemoveAll = true;
    @Input() setTextEntryToValue = true;
    @Input() floatingLabel: string;
    @Input() isOpen = false;
    @Input() autoValidate = true;
    @Input() showRefresh = false;
    @Input() isRefreshing = false;

    @Output() textValueChange = new EventEmitter<string>();
    @Output() valueChange = new EventEmitter<{textValue: string, item: any}>();
    @Output() shown = new EventEmitter();
    @Output() refreshed = new EventEmitter();
    @Output() openChange = new EventEmitter<any>();

    @ViewChild('dropdownButton', { static: true }) dropdownElement: any;

    @ContentChild('startItems', {static: true }) public startItemsTemplate: TemplateRef<any>;
    @ContentChild('endItems', {static: true }) public endItemsTemplate: TemplateRef<any>;

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    selectedItem: any;
    selectedName: string;

    filterSubscription: Subscription;
    manualSubscription: Subscription;

    needsUpdate = false;

    filterControl = new FormControl();
    filterString = '';

    sortedItems: Array<any>;

    manualControl = new FormControl();
    doManualControlUpdate = true;

    // contains a list of the items all combine into one array.
    flattenedItems: Array<any>;

    // select index used for maintaining position when using arrows
    selectedIndex: number;

    isDirty = false;
    isTextEntry = false;

    showDropDown = true;
    disableInput = false;
    placeholder: string;

    private blockMenuClose = false;

    selectedKeys: any[];  // list of selected keys
    isChangingCounter = 0;
    oldValue = this.value;

    onChange: any = () => { };
    onTouched: any = () => { };


    constructor() {

     }

     ngOnInit() {
        // monitor changes to the filter control
        this.manualSubscription = this.manualControl.valueChanges
            .subscribe(newValue => {
                if (this.doManualControlUpdate && !this.manualControl.pristine) {
                    this.needsUpdate = true;
                    this.textValue = newValue;
                    this.selectedItem = null;
                    this.selectedName = this.textValue;

                    let foundItem;

                    if (this.hasValue(newValue) && this.enableTextEntryMatch) {
                        if (this.itemName) {
                            foundItem = this.flattenedItems
                                .find(c => (c && c[this.itemName] &&
                                    c[this.itemName].toString().toLocaleLowerCase() === newValue.toLocaleLowerCase()) ||
                                    (c && c[this.itemKey] &&
                                        c[this.itemKey].toString().toLocaleLowerCase() === newValue.toLocaleLowerCase())
                                );
                            if (this.hasValue(foundItem)) {
                                this.selectedItem = foundItem;
                                this.doManualControlUpdate = false;
                                this.textValue = foundItem[this.itemName];
                                this.manualControl.setValue(foundItem[this.itemName]);
                                this.isTextEntry = false;
                                if (!this.enableTextEntry) {
                                    this.updateValueFromItem(this.selectedItem);
                                    this.textValueChange.emit(this.textValue);
                                    this.valueChange.emit({textValue: this.textValue, item: this.selectedItem});
                                    this.hasChanged();
                                }
                            } else if (this.enableTextEntry) {
                                this.isTextEntry = true;
                                this.selectedItem = newValue;
                            }
                        } else {
                            foundItem = this.flattenedItems.find(c => c &&
                                c.toString().toLocaleLowerCase() === newValue.toLocaleLowerCase());
                            if (this.hasValue(foundItem)) {
                                this.selectedItem = foundItem;
                                this.doManualControlUpdate = false;
                                this.textValue = foundItem;
                                this.manualControl.setValue(foundItem);
                                this.isTextEntry = false;
                                if (!this.enableTextEntry) {
                                    this.updateValueFromItem(this.selectedItem);
                                    this.textValueChange.emit(this.textValue);
                                    this.valueChange.emit({textValue: this.textValue, item: this.selectedItem});
                                    this.hasChanged();
                                }
                            } else if (this.enableTextEntry) {
                                this.isTextEntry = true;
                                this.selectedItem = newValue;
                            }
                        }
                    } else {
                       if (this.allowNullSelect) {
                            this.selectedItem = null;
                       } else if (this.allowBlankSelect) {
                           this.selectedItem = '';
                       }
                    }

                    if (this.enableTextEntry) {
                        this.updateTextEntry();
                    }

                    if (this.enableFilter) {
                        this.filterString = newValue;
                    }
                }
                this.doManualControlUpdate = true;
            });

            if (this.disabled) {
                this.manualControl.disable();
            }

            this.writeValue(this.value);

            this.isTextEntry = !this.hasValue(this.selectedItem); // && this.hasValue(this.textValue);


        // this.dropdown.onHidden;
     }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.multiSelect) {
            if (changes.multiSelect.currentValue) {
                if (!(this.value instanceof Array)) {
                    this.clearAll();
                }
            } else {
                this.value = null;
            }
        }
        this.refreshItems();
    }

    ngOnDestroy() {
        if (this.filterSubscription) { this.filterSubscription.unsubscribe(); }
        if (this.manualSubscription) { this.manualSubscription.unsubscribe(); }
    }

    hasChanged() {
        if (this.oldValue === null ||  JSON.stringify(this.value) !== JSON.stringify(this.oldValue)) {
            if (this.multiSelect) {
                this.value = [...this.value];
                this.oldValue = [...this.value];
            } else {
                this.oldValue = this.value;
            }

            // checking the onChange.length is a workaround for error:
            // "There is no FormControl instance attached to form control element with name:"
            // it appears the onChange is reset when the control is reinitialized.
            if(this.onChange.length > 0) {
                this.onChange(this.value);
                this.onTouched();
            }
            this.isDirty = true;
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    hasValue(value: any): boolean {
        const result = typeof(value) !== 'undefined' && value !== null;
        return result;
    }

    getItemName(value: any): string {
        if (this.hasValue(this.itemName)) {
            return value[this.itemName];
        }

        return value;
    }

    getItemKey(value: any): string {
        if (this.hasValue(this.itemKey)) {
            return value[this.itemKey];
        }

        return value;
    }

    writeValue(value: any) {
        this.selectedItem = null;

        if (this.hasValue(value)) {
            if (this.multiSelect) {
                if (Array.isArray(value)) {
                    this.value = value;
                } else {
                    this.value = [value];
                }
            } else {
                if (Array.isArray(value)) {
                    if (value.length > 0) {
                        this.value = value[0];
                    } else {
                        this.value = [];
                    }
                } else {
                    this.value = value;
                }
            }
            this.setSelectedItem(this.value, this.items);
        } else {
            if (this.multiSelect) {
                this.value = [];
                this.selectedKeys = [];
            } else {
                this.selectedItem = null;
                this.selectedName = null;
                this.textValue = null;
                this.value = null;
                this.manualControl.setValue(null);
            }
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.manualControl.disable();
        } else {
            this.manualControl.enable();
        }
    }

    lookupItem(value: any): {item: any, found: boolean} {
        for(let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (this.childItems) {
                const children = item[this.childItems]
                for(let j = 0; j < children.length; j++) {
                    const child = children[j];
                    if (this.grandChildItems) {
                        const grandChildren = child[this.grandChildItems];
                        for (let k = 0; k < grandChildren.length; k++) {
                            const grandChild = grandChildren[k];
                            if (this.testItem(grandChild, value)) {
                                return {item: grandChild, found: true};
                            }
                        }
                    } else {
                        if (this.testItem(child, value)) {
                            return {item: child, found: true};
                        }
                    }
                }
            } else {
                if (this.testItem (item, value)) {
                    return {item, found: true};
                }
            }
        }

        if(this.enableTextEntry) {
            return {item: value, found: false}; // (value, false);
        }

        return {item: null, found: false};
    }

    testItem(item: any, testValue: any): boolean {
        if(this.hasValue(item)) {
            if(this.itemKey) {
                if (this.enableKeySelect) {
                    return item[this.itemKey] === testValue;
                } else {
                    return item[this.itemKey] === testValue[this.itemKey];
                }
            } else {
                return item === testValue;
            }
        } else {
            return false;
        }
    }

    updateValueFromItem(item: any) {
        if (this.hasValue(item)) {
            if (this.hasValue(this.itemKey) && this.enableKeySelect) {
                this.value = item[this.itemKey];
            } else {
                this.value = item;
            }
        } else {
            this.value = null;
        }
    }

    refreshItems() {
        this.showDropDown = (this.items && this.items.length > 0) ||
        (this.textEntryItems && this.textEntryItems.length > 0) ||
        typeof(this.startItemsTemplate) !== 'undefined' ||
        typeof(this.endItemsTemplate) !== 'undefined' ||
        this.allowNullSelect || this.allowBlankSelect || this.showRefresh;

        this.disableInput = !this.showDropDown && !this.enableTextEntry;

        if ((this.enableFilter && this.showDropDown) || this.enableTextEntry) {
            this.placeholder = this.textEntryNote;
        } else {
            this.placeholder = this.disabledNote;
        }

        if (this.sortItems) {
            const hasItemName = this.hasValue(this.itemName);
            this.sortedItems = this.items.sort((a, b) => {
                if(hasItemName) {
                    if (a[this.itemName] > b[this.itemName]) {
                        return 1;
                    }
                    if (a[this.itemName] < b[this.itemName]) {
                        return -1;
                    }
                } else {
                    if (a > b) {
                        return 1;
                    }
                    if (a < b) {
                        return -1;
                    }
                }
                return 0;
            });
        } else {
            if (this.items) {
                this.sortedItems = this.items;
            } else {
                this.sortedItems = [];
            }
        }

        this.flattenedItems = [];
        if (this.childItems) {
            this.items.forEach(parentItem => {
                const childItems = parentItem[this.childItems] as Array<any>;
                if (this.grandChildItems) {
                    childItems.forEach(childItem => {
                        this.flattenedItems = this.flattenedItems.concat(childItem[this.grandChildItems]);
                    });
                } else {
                    this.flattenedItems = this.flattenedItems.concat(childItems);
                }
            });
        } else {
            if (this.items) {
                this.flattenedItems = this.items;
            } else {
                this.flattenedItems = [];
            }
        }
    }

    refresh() {
        this.blockMenuClose = true;
        this.refreshed.emit();
        this.blockMenuClose = false;
    }

    selectText(item: any) {
        if (this.multiSelect) {
            this.pushTextItem(item);
        } else {
            this.dropdownToggle();

            this.value = this.setTextEntryToValue ? item : null;
            this.textValue = item;

            // if (!this.enableTextEntry) {
                this.textValueChange.emit(this.textValue);
                this.valueChange.emit({textValue: this.textValue, item: null});
            // }
            this.manualControl.setValue(item);
        }
    }

    selectItem(selectedItem: any, hideDropdown = true) {
        this.needsUpdate = !hideDropdown;

        if (this.multiSelect) {
            if (selectedItem) {
                if (!this.selectedKeys) { this.selectedKeys = []; }

                const selectedKey = this.getItemKey(selectedItem);

                // if the item already selected, then do nothing
                if(this.selectedKeys.findIndex(c => c === selectedKey) >= 0) {
                    return;
                }

                let item;

                if (this.itemKey) {
                    item = Object.assign({}, selectedItem);
                    item.isKey = true;
                } else {
                    item = selectedItem;
                }

                this.selectedKeys.push(selectedKey);
                this.value.push(item);
            }
        }
        else {
            this.selectedItem = selectedItem;
            this.isTextEntry = false;

            if(selectedItem === '') {
                this.value = null;
                this.selectedName = '';
            }
            else if (this.hasValue(selectedItem)) {
                this.updateValueFromItem(selectedItem);

                this.selectedName = this.getItemName(selectedItem);

                // this.doManualControlUpdate = false;
            } else {
                this.value = null;
                this.selectedName = null;
            }
        }

        // run hasChanged before textValue changed, so users can see if an item is selected when textValue changes.
        this.hasChanged();

        this.textValue = this.selectedName;
        // this.valueChange.emit(this.textValue);
        this.manualControl.setValue(this.selectedName);

        if (hideDropdown && !this.multiSelect) {
            this.dropdownHide();
        }
        // this.updateTextEntry(hideDropdown);
    }

    private setSelectedItem(value: any, items: Array<any>) {
        if (this.multiSelect) {
            if (this.hasValue(value)) {
                if (this.itemKey) {
                    this.selectedKeys = value.map(c => c[this.itemKey]);
                } else {
                    this.selectedKeys = [...value];
                }
            }
        } else {
            const lookup = this.lookupItem(value);
            this.selectedItem = lookup.item;

            if(lookup.found) {
                this.isTextEntry = false;
            }

            if (this.hasValue(this.itemName)) {
                if (this.hasValue(value) && items) {
                    if (this.selectedItem) {
                        this.selectedName = this.selectedItem[this.itemName];
                    }
                } else {
                    this.selectedName = this.selectedItem;
                }
            } else {
                this.selectedName = this.selectedItem;
            }

            // this.doManualControlUpdate = false;
            if (this.selectedName === undefined && this.enableTextEntry) {
                this.selectedName = value;
            }

            this.manualControl.setValue(this.selectedName);
        }
    }

    onTextEntryEnter() {
        this.updateTextEntry();

        if (this.multiSelect) {
            this.pushTextItem(this.textValue);
        }
    }

    // adds a text item to the tags (multiSelect only)
    pushTextItem(value: any) {
        if (!this.selectedKeys) { this.selectedKeys = []; }

        // if the item already selected, then do nothing
        if(this.selectedKeys.findIndex(c => c === value) >= 0) {
            return;
        }

        let item: any;
        if (this.hasValue(this.itemKey)) {
            item = {};
            item[this.itemKey] = value;
            item[this.itemName] = value;
            item.isKey = false;
        } else {
            item = value;
        }

        this.selectedKeys.push(value);
        this.value.push(item);
        this.manualControl.setValue(null);
        this.hasChanged();
    }

    // detect a click outside the control, and hide the dropdown
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: any) {
       if (this.needsUpdate) {
            const clickedInside = this.dropdownElement.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.updateTextEntry();
            }
       }
       if (this.isOpen) {
            const clickedInside = this.dropdownElement.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.dropdownHide();
        }
       }
    }

    getFilteredItems(): Array<any> {
        if (this.filterString) {
            const filterString = this.filterString.toLowerCase();
            if (this.itemName) {
                return this.flattenedItems.filter(c => c[this.itemName].toLowerCase().includes(filterString) );
            } else {
                return this.flattenedItems.filter(c => c.toLowerCase().includes(filterString));
            }
        } else {
            return this.flattenedItems;
        }
    }

    down() {
        let found = false;
        let nextItem: any = null;
        const filteredItems = this.getFilteredItems();
        filteredItems.forEach(item => {
            if (!nextItem) {
                if (found) {
                    nextItem = item;
                }
                if (this.hasValue(this.itemName) && item[this.itemName].toLowerCase() === this.selectedName.toLowerCase()) {
                    found = true;
                } else if (!this.itemName && item.toLowerCase() === this.selectedName.toLowerCase()) {
                    found = true;
                }
            }
        });

        if (!this.hasValue(nextItem) && filteredItems.length > 0) {
            nextItem = filteredItems[0];
        }

        this.selectItem(nextItem, false);
    }

    up() {
        let previousItem: any = null;
        let foundItem: any = null;
        const filteredItems = this.getFilteredItems();
        filteredItems.forEach(item => {
            if (!foundItem) {
                if (this.itemName && item[this.itemName].toLowerCase() === this.selectedName.toLowerCase()) {
                    foundItem = previousItem;
                } else if (!this.itemName && item.toLowerCase() === this.selectedName.toLowerCase()) {
                    foundItem = previousItem;
                }
                previousItem = item;
            }
        });

        if (!foundItem && filteredItems.length > 0) {
            foundItem = filteredItems[filteredItems.length - 1];
        }

        this.selectItem(foundItem, false);
    }

    dropdownShow() {
        this.isOpen = true;
        this.openChange.emit();
        this.shown.emit();
    }

    // the timeout is to allow the menu click to occur before closing the dropdown.
    dropdownHide(delay = 200) {
        setTimeout(() => {
            if (!this.blockMenuClose) {
                this.isOpen = false;
                this.openChange.emit();
            }
            this.blockMenuClose = false;
        },
        delay);
    }

    dropdownToggle() {
        if (this.showDropDown) {
            this.isOpen = !this.isOpen;
            this.openChange.emit();
            if(this.isOpen) {
                this.shown.emit();
            }
        }
    }


    remove(index: number) {
        if (index >= 0 && this.selectedKeys) {
            this.selectedKeys.splice(index, 1);
            this.value.splice(index, 1);
            this.hasChanged();
        }
    }

    addAll() {
        if (!this.sortedItems) { return; }

        if (this.itemKey) {
            this.selectedKeys = this.sortedItems.map(c => c[this.itemKey]);
        } else {
            this.selectedKeys = [...this.sortedItems];;
        }

        this.value = [...this.sortedItems];
        this.hasChanged();
        this.dropdownHide();
    }

    clearAll() {
        this.selectedKeys = [];
        this.value = [];
        this.hasChanged();
    }

    private updateTextEntry() {
        // this.dropdown.toggle();

        if (this.multiSelect) { return; }

        if (this.enableTextEntry) {
            this.value = this.setTextEntryToValue && this.textValue ? this.textValue : null;
            this.hasChanged();

            // for text entry enabled, just set the current value and emit.
            this.textValueChange.emit(this.textValue);
            this.valueChange.emit({textValue: this.textValue, item: null});

        } else if (!this.hasValue(this.selectedItem)) {
            // no selected item, then revert to previous one.
            this.doManualControlUpdate = false;
            if (this.hasValue(this.itemName) && this.hasValue(this.value)) {
                const item = this.flattenedItems.find(c => c && c[this.itemKey] === this.value);
                if (item) {
                    this.textValue = item[this.itemName];
                } else {
                    this.textValue = null;
                }
                this.selectedItem = item;
                this.manualControl.setValue(this.textValue);
                this.textValueChange.emit(this.textValue);
                this.valueChange.emit({textValue: this.textValue, item: null});
            } else {
                this.manualControl.setValue(this.value);
            }
        } else {
            this.updateValueFromItem(this.selectedItem);
            // if (this.itemName) {
            //     this.textValue = this.value[this.itemName];
            // } else {
            //     this.textValue = this.value;
            // }
            this.textValueChange.emit(this.textValue);
            this.valueChange.emit({textValue: this.textValue, item: null});
        }

        this.needsUpdate = false;
        this.filterString = '';

    }
}
