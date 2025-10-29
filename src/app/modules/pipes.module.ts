import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {KeysPipe} from '../pipes/keys.pipe';
import {SafePipe} from '../pipes/safe.pipe';
import {StatusPipe} from '../pipes/status.pipe';
import {IsNullPipe} from '../pipes/is-null.pipe';
import {CommonPipe} from '../pipes/common.pipe';
import {CapitalizePipe} from '../pipes/capitalize.pipe';
import { AwsvsPipe } from '../pipes/awsvs.pipe';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        KeysPipe,
        SafePipe,
        StatusPipe,
        IsNullPipe,
        CommonPipe,
        CapitalizePipe,
        AwsvsPipe
    ],
    exports: [
        CommonModule,
        KeysPipe,
        SafePipe,
        StatusPipe,
        IsNullPipe,
        CommonPipe,
        CapitalizePipe,
        AwsvsPipe]
})
export class PipesModule {
}
