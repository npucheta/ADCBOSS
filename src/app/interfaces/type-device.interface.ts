import {FormGroup} from '@angular/forms';

export interface TypeDeviceInterface {
    title: string;
    form: FormGroup;

    ngOnInit(): void;

    ngOnDestroy(): void;

    save(): void;

    reset(): void;
}
