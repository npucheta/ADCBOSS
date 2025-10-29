import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {SuccessComponent} from '../shared/toast/success/success.component';
import {ErrorComponent} from '../shared/toast/error/error.component';
import {CustomMsgComponent} from '../shared/toast/custommsg/custommsg.component';

@Injectable()
export class ToastService {
    private readonly DURATION = 3000;


    constructor(private snackBar: MatSnackBar) {
    }

    show(message: string, action?: string) {
        this.snackBar.open(message, action, {
            duration: this.DURATION
        });
    }

    showSuccess() {
        this.snackBar.openFromComponent(SuccessComponent, {
            duration: this.DURATION
        });
    }

    showError() {
        this.snackBar.openFromComponent(ErrorComponent, {
            duration: this.DURATION
        });
    }

    showMessage(message:String) {
        this.snackBar.openFromComponent(CustomMsgComponent, {
            duration: this.DURATION
        }); 
    }
}
