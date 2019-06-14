import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef,
    Input } from '@angular/core';
import { ToastMessage, ToastComponent } from './dexih-toast.models';
import { DexihToastItemComponent } from './dexih-toast-item.component';
import { trigger, style, transition, animate } from '@angular/animations';



@Component({
    selector: 'dexih-toast, [dexih-toast]',
    templateUrl: './dexih-toast.component.html',
    styleUrls: ['./dexih-toast.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ height: '0px', 'opacity': 0 }),
                animate('0.5s ease', style({ 'height': 'auto', 'opacity': 1 })),
            ]),
            transition(':leave', [
                animate('0.5s ease', style({ 'height': '0px', 'opacity': 0 })),
            ])
        ]),
      ]
})
export class DexihToastComponent implements OnInit {
    @Input() maxMessages = 5;
    @ViewChild('toastContainer', {static: true, read: ViewContainerRef }) toastContainer: ViewContainerRef;

    public messages: ToastComponent[] = [];

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() { }

    public add(message: ToastMessage) {
        if (this.messages.length >= this.maxMessages) {
            this.messages[0].destroy();
        }

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DexihToastItemComponent);
        const componentRef = this.toastContainer.createComponent(componentFactory, 0);
        const toastComponent = new ToastComponent(componentRef, message, (t) => this.onDestroy(t));
        this.messages.push(toastComponent);
    }

    public onDestroy(toastComponent: ToastComponent) {
        const index = this.messages.indexOf(toastComponent);
        this.messages.splice(index, 1);
    }

    public clearAll() {
        for (let i = this.messages.length - 1; i >= 0; i--) {
            this.messages[i].destroy();
        }
    }
}
