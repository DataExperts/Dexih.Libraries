import { DexihToastComponent } from './dexih-toast.component';
import { Subscription } from 'rxjs';
import { DexihToastItemComponent } from './dexih-toast-item.component';
import { ComponentRef, ɵisDefaultChangeDetectionStrategy } from '@angular/core';

export class ToastMessage {
    public content: string;
    public title: string;
    public type: 'success' | 'info' | 'error' = 'success';
    public delay = 6000;
    public reference: any;
    public onButtonClick: (message: ToastMessage) => void;
    public buttonName: string = null;

    public constructor(type: 'success' | 'info' | 'error' = 'success', title: string, content: string, delay = 6000) {
        this.type = type;
        this.title = title;
        this.content = content;
    }
}

export class ToastComponent {

    public item: DexihToastComponent;
    public destroySubscription: Subscription;

    private isDestroyed = false;

    public constructor(
        public componentRef: ComponentRef<DexihToastItemComponent>,
        public message: ToastMessage,
        public onDestroy: (toastComponent: ToastComponent) => void) {

        let item = componentRef.instance;
        item.message = message;

        this.destroySubscription = item.onDestroy.subscribe(() => {
            this.doDestroy();
        });
    }

    // called back from the toast component after close animations are completed.
    public destroy() {
        if (!this.isDestroyed) {
            this.isDestroyed = true;
            this.doDestroy();
        }
    }

    private doDestroy() {
        if (this.destroySubscription) { this.destroySubscription.unsubscribe(); }
        this.componentRef.instance.destroy();
        this.onDestroy(this);
    }
}
