import {Injectable} from '@angular/core';
import {ToastService} from './toast.service';

@Injectable()
export class MainService {

    constructor(private _toastService: ToastService) {
    }

    // TODO disable log in production, only dev
    public handlerSuccess(data?: any, toast = false) {
        if (toast) {
            this._toastService.showSuccess();
        }
        console.log('All success ', data);
    }

    // TODO disable log in production, only dev
    public handlerError(error: any, toast = false) {
        if (toast) {
            this._toastService.showError();
        }
        console.log('An issue has occurred ', error);
    }

     public showMessage(error: any, toast = false) {
        if (toast) {
            this._toastService.showMessage(error);
        }
        console.log('An issue has occurred ', error);
    }

    public getError(error: string): string {
        return JSON.parse(error);
    }
}
