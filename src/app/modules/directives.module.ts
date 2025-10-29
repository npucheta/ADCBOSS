import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollapseDirective} from '../directives/collapse.directive';
import {HighlightDirective} from '../directives/highlight.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CollapseDirective,
        HighlightDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DirectivesModule {
}
