import { Component, OnInit, OnChanges, OnDestroy, forwardRef, Input, Output,
    ViewChild, HostListener, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-select',
    templateUrl: './dexih-form-select.component.html',
    styleUrls: ['./dexih-form.component.scss'],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormSelectComponent), multi: true }]
})
export class DexihFormSelectComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() value: any;
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
    @Input() selectNullMessage = 'Select nothing';
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
    @Input() autoMatchTextEntry = true;
    @Input() autocapitalize = 'none';
    @Output() textValueChange = new EventEmitter();
    @Output() onShown = new EventEmitter();
    
    @ViewChild(BsDropdownDirective, { static: true }) dropdown: BsDropdownDirective;
    @ViewChild('dropdown', { static: true }) dropdownElement: any;

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

    showDropDown = true;
    disableInput = false;
    placeholder: string;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() {

     }

     ngOnInit() {
        // monitor changes to the filter control, and update if updated after 500ms.
        this.manualSubscription = this.manualControl.valueChanges
            .subscribe(newValue => {
                if (this.doManualControlUpdate) {
                    this.needsUpdate = true;
                    this.textValue = newValue;
                    this.selectedItem = null;
                    this.selectedName = this.textValue;

                    let foundItem;
                    if (this.hasValue(newValue) && this.enableTextEntryMatch) {
                        if (this.itemName) {
                            foundItem = this.flattenedItems
                                .find(c => (<string>c[this.itemName]).toLocaleLowerCase() === newValue.toLowerCase());
                            if (this.hasValue(foundItem)) {
                                this.selectedItem = foundItem;
                                this.doManualControlUpdate = false;
                                this.textValue = foundItem[this.itemName];
                                this.manualControl.setValue(foundItem[this.itemName]);
                                if (!this.enableTextEntry) {
                                    this.updateValueFromItem(this.selectedItem);

                                    this.textValueChange.emit(this.textValue);
                                    this.hasChanged();
                                }
                            } else if (this.enableTextEntry) {
                                this.selectedItem = newValue;
                            }
                        } else {
                            foundItem = this.flattenedItems.find(c => (<string>c).toLocaleLowerCase() === newValue.toLowerCase());
                            if (this.hasValue(foundItem)) {
                                this.selectedItem = foundItem;
                                this.doManualControlUpdate = false;
                                this.textValue = foundItem;
                                this.manualControl.setValue(foundItem);
                                if (!this.enableTextEntry) {
                                    this.updateValueFromItem(this.selectedItem);
                                    this.textValueChange.emit(this.textValue);
                                    this.hasChanged();
                                }
                            } else if (this.enableTextEntry) {
                                this.selectedItem = newValue;
                            }
                        }
                    } else {
                       if (this.allowNullSelect) {
                            this.selectedItem = null;
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

         // this.refreshItems();
        // this.filterSubscription = this.manualControl.valueChanges
        //     .pipe(debounceTime(500))
        //     .subscribe(newValue => {
        //         if (this.doManualControlUpdate) {
        //             this.filterString = newValue;
        //         }
        //     });

        this.dropdown.onHidden
     }

    ngOnChanges(changes: SimpleChanges) {
        this.refreshItems();

      //  this.writeValue(this.value);
    }

    ngOnDestroy() {
        if (this.filterSubscription) { this.filterSubscription.unsubscribe(); }
        if (this.manualSubscription) { this.manualSubscription.unsubscribe(); }
    }

    hasChanged() {
        this.onChange(this.value);
        this.onTouched();
        this.isDirty = true;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    hasValue(value: any): boolean {
        let result = typeof(value) !== 'undefined' && value !== null;
        return result;
    }

    writeValue(value: any) {
        this.selectedItem = null;
        if (this.hasValue(value)) {
            this.value = value;
            this.setSelectedItem(this.value, this.items);
        } else {
            this.selectedItem = null;
            this.selectedName = '';
            if (this.enableTextEntry) {
                if (this.textValue) {
                    this.selectedName = this.textValue;
                    this.doManualControlUpdate = false;
                    this.manualControl.setValue(this.textValue);
                }
            }
        }
        // if (this.childItems) {
        //     this.items.forEach(item => {
        //         let childItems = <Array<any>> item[this.childItems];

        //         if (this.grandChildItems) {
        //             childItems.forEach(childItem => {
        //                 if (this.hasValue(value) && !this.hasValue(this.selectedItem)) {
        //                     this.setSelectedItem(value, childItem[this.grandChildItems]);
        //                 }
        //             });
        //         } else {
        //             if (this.hasValue(value) && !this.hasValue(this.selectedItem)) {
        //                 this.setSelectedItem(value, childItems);
        //             }
        //         }
        //     });
        // }
    }

    lookupItem(value: any):any {
        let found: any = null;
        for(let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (this.childItems) {
                let children = item[this.childItems]
                for(let j = 0; j < children.length; j++) {
                    let child = children[j];
                    if (this.grandChildItems) {
                        let grandChildren = child[this.grandChildItems];
                        for (let k = 0; k < grandChildren.length; k++) {
                            let grandChild = grandChildren[k];
                            if (this.testItem(grandChild, value)) {
                                return grandChild;
                            }
                        }
                    } else {
                        if (this.testItem(child, value)) {
                            return child;
                        }
                    }
                }
            } else {
                if (this.testItem (item, value)) {
                    return item;
                }
            }
        }

        if(this.enableTextEntry) {
            return value;
        }

        return null;
    }

    testItem(item: any, testValue: any): boolean {
        if(this.hasValue(item)) {
            if(this.itemKey) {
                if (this.enableKeySelect) {
                    return item[this.itemKey] === testValue;
                } else {
                    return item[this.itemKey] == testValue[this.itemKey];
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
            item = null;
        }
    }

    refreshItems() {
        this.showDropDown = (this.items && this.items.length > 0) ||
        (this.textEntryItems && this.textEntryItems.length > 0) ||
        this.allowNullSelect;

        this.disableInput = !this.showDropDown && !this.enableTextEntry;

        if ((this.enableFilter && this.showDropDown) || this.enableTextEntry) {
            this.placeholder = this.textEntryNote;
        } else {
            this.placeholder = this.disabledNote;
        }

        if (this.sortItems) {
            this.sortedItems = this.items.sort((a, b) => {
                if (a[this.itemName] > b[this.itemName]) {
                    return 1;
                }
                if (a[this.itemName] < b[this.itemName]) {
                    return -1;
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
                let childItems = <Array<any>> parentItem[this.childItems];
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

    selectText(item: any) {
        this.dropdown.toggle();
        this.value = item;
        this.textValue = item;
        this.textValueChange.emit(this.textValue);
        this.manualControl.setValue(item);
    }

    selectItem(selectedItem: any, hideDropdown = true) {
        this.needsUpdate = !hideDropdown;

        this.selectedItem = selectedItem;
        if (this.hasValue(selectedItem)) {
            this.updateValueFromItem(selectedItem);

            if (this.hasValue(this.itemName)) {
                this.selectedName = selectedItem[this.itemName];
            } else {
                this.selectedName = selectedItem;
            }

            this.doManualControlUpdate = false;
        } else {
            this.value = null;
            this.selectedName = '';
        }

        this.textValue = this.selectedName;
        this.manualControl.setValue(this.selectedName);
        this.textValueChange.emit(this.textValue);

        this.hasChanged();
        if (hideDropdown) { this.dropdown.hide(); }
        // this.updateTextEntry(hideDropdown);
    }

    private setSelectedItem(value: any, items: Array<any>) {
        // if (this.hasValue(this.itemKey)) {
        //     if (this.hasValue(value) && items) {
        //         this.selectedItem = items.find(c => c[this.itemKey] === value);
        //     } else {
        //         this.selectedItem = value;
        //     }
        // } else {
        //     this.selectedItem = value;
        // }

        this.selectedItem = this.lookupItem(value);

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

        this.doManualControlUpdate = false;
        this.manualControl.setValue(this.selectedName);
    }

    onTextEntryEnter($event: any) {
        this.updateTextEntry();
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
       if (this.dropdown.isOpen) {
            const clickedInside = this.dropdownElement.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.dropdown.hide();
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
        this.dropdown.show();
    }

    // the timeout is to allow the menu click to occur before closing the dropdown.
    dropdownHide(delay = 500) {
        setTimeout(() => {
            this.dropdown.hide();
        },
        delay);
    }

    dropdownToggle() {
        if (this.showDropDown) {
            this.dropdown.toggle(true);
        }
    }

    shown() {
        this.onShown.emit();
    }

    private updateTextEntry() {
        this.dropdown.toggle();

        if (this.enableTextEntry) {
            // for text entry enabled, just set the current value and emit.
            this.value = this.selectedItem;
            this.textValueChange.emit(this.textValue);
        } else if (!this.hasValue(this.selectedItem)) {
            // no selected item, then revert to previous one.
            this.doManualControlUpdate = false;
            if (this.hasValue(this.itemName) && this.hasValue(this.value)) {
                let item = this.flattenedItems.find(c => c[this.itemKey] === this.value);
                if (item) {
                    this.textValue = item[this.itemName];
                } else {
                    this.textValue = null;
                }
                this.selectedItem = item;
                this.manualControl.setValue(this.textValue);
                this.textValueChange.emit(this.textValue);
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
        }

        this.needsUpdate = false;
        this.filterString = '';
        this.onChange(this.value);
        this.onTouched();
        this.isDirty = true;

    }
}
