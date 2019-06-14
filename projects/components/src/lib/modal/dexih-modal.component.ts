import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
    selector: 'dexih-modal, [dexih-modal]',
    templateUrl: './dexih-modal.component.html',
})
export class DexihModalComponent implements OnInit {
    @ViewChild('template', { static: true }) template: any ;

    modalRef: BsModalRef;

    config = {ignoreBackdropClick: true};

    public isOpen = false;

    public type: string;
    public title: string;
    public content: string;
    public okButton: string;
    public cancelButton: string;
    public inputValue: string;
    public inputPrompt: string;

    private resolveBool: (value?: Boolean | PromiseLike<boolean>) => void;
    private resolveString: (value?: string | PromiseLike<string>) => void;
    private reject: (reason?: string) => void;

    constructor(private modalService: BsModalService) { }

    ngOnInit(): void {
    }

    public prompt(
            title: string,
            content: string,
            inputPrompt = 'Enter value:',
            okButton = 'Ok',
            cancelButton = 'Cancel'): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.type = 'prompt';
            this.title = title;
            this.content = content;
            this.inputPrompt = inputPrompt;
            this.okButton = okButton;
            this.cancelButton = cancelButton;
            this.modalRef = this.modalService.show(this.template, this.config);

            this.resolveString = resolve;
            this.reject = reject;
        });
    }

    public information(title: string, content: string, okButton = 'Close'): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.type = 'information';
            this.title = title;
            this.content = content;
            this.okButton = okButton;
            this.modalRef = this.modalService.show(this.template);

            this.resolveBool = resolve;
            this.reject = reject;
        });
    }

    public confirm(title: string, content: string, okButton = 'Ok', cancelButton = 'Cancel'): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.type = 'confirm';
            this.title = title;
            this.content = content;
            this.okButton = okButton;
            this.cancelButton = cancelButton;
            this.modalRef = this.modalService.show(this.template, this.config);

            this.resolveBool = resolve;
            this.reject = reject;
        });
    }


    public cancel() {
        if (this.modalRef) {
            this.modalRef.hide();
        }

        switch (this.type) {
            case 'prompt':
                this.reject();
                break;
            case 'information':
                this.resolveBool(true);
                break;
            case 'confirm':
                this.reject();
                break;
        }
    }

    public ok() {
        if (this.modalRef) {
            this.modalRef.hide();
        }

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
