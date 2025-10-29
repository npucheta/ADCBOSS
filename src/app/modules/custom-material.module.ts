import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {MdMenuModule} from 'material2-srcs/src/lib/public_api';
import {
    CompatibilityModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatOptionModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule, MAT_DIALOG_DATA
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        CompatibilityModule,
        MatDialogModule,
        MatToolbarModule,
        MatButtonModule,
        MatOptionModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule
    ],
    exports: [
        CommonModule,
        CompatibilityModule,
        MatDialogModule,
        MatToolbarModule,
        MatButtonModule,
        MatOptionModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule
    ],
    declarations: [],
    providers: [MatDialogModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CustomMaterialModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CustomMaterialModule,
            providers: [MatDialogModule]
        };
    }
}
