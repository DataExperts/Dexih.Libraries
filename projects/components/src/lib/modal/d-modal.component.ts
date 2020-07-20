import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'd-modal, [d-modal]',
    templateUrl: './d-modal.component.html',
    styleUrls: ['./d-modal.component.scss']
})
export class DModalComponent implements OnInit {
    public isOpen = false;

    public type: string;
    public title: string;
    public content: string;
    public okButton: string;
    public cancelButton: string;
    public inputValue: string;
    public inputPrompt: string;
    public details: string;

    public showDetails = false;

    private resolveBool: (value?: Boolean | PromiseLike<boolean>) => void;
    private resolveString: (value?: string | PromiseLike<string>) => void;
    private reject: (reason?: string) => void;

    constructor() { }

    ngOnInit(): void {
    }

    public prompt(
            title: string,
            content: string,
            inputPrompt = 'Enter value:',
            inputValue = '',
            okButton = 'Ok',
            cancelButton = 'Cancel',
            details = null): Promise<string> {

        if (this.isOpen) { return Promise.reject('The modal is already open'); }
        return new Promise<string>((resolve, reject) => {
            this.type = 'prompt';
            this.title = title;
            this.content = content;
            this.inputPrompt = inputPrompt;
            this.inputValue = inputValue;
            this.okButton = okButton;
            this.cancelButton = cancelButton;
            this.details = details;
            this.isOpen = true;

            this.resolveString = resolve;
            this.reject = reject;
        });
    }

    public information(title: string, content: string, okButton = 'Close', details = null): Promise<boolean> {
        if (this.isOpen) { return Promise.reject('The modal is already open'); }
        return new Promise<boolean>((resolve, reject) => {
            this.type = 'information';
            this.title = title;
            this.content = content;
            this.okButton = okButton;
            this.details = details;
            this.isOpen = true;

            this.resolveBool = resolve;
            this.reject = reject;
        });
    }

    public confirm(title: string, content: string, okButton = 'Ok', cancelButton = 'Cancel', details = null): Promise<boolean> {
        if (this.isOpen) { return Promise.reject('The modal is already open'); }
        return new Promise<boolean>((resolve, reject) => {
            this.type = 'confirm';
            this.title = title;
            this.content = content;
            this.okButton = okButton;
            this.cancelButton = cancelButton;
            this.details = details;
            this.isOpen = true;

            this.resolveBool = resolve;
            this.reject = reject;
        });
    }


    public cancel() {
        this.isOpen = false;

        switch (this.type) {
            case 'prompt':
                this.reject();
                break;
            case 'information':
                this.resolveBool(true);
                break;
            case 'confirm':
                this.resolveBool(false);
                break;
        }
    }

    public ok() {
        this.isOpen = false;

        switch (this.type) {
            case 'prompt':
                this.resolveString(this.inputValue);
                break;
            case 'information':
            case 'confirm':
                this.resolveBool(true);
                break;
        }
    }


}
