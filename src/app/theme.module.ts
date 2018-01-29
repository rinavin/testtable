import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCheckboxModule,

  MatCardModule, MatListModule, MatInputModule, MatSliderModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatTabsModule, MatStepperModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatSliderModule,
        MatInputModule,
        MatCheckboxModule,

        BrowserAnimationsModule,

      MatSelectModule,
      MatSidenavModule,

      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatStepperModule

    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatInputModule,
        MatSliderModule,
        MatCheckboxModule,

          MatSelectModule,
      MatSidenavModule,

      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,


      MatStepperModule

    ]
})
export class ThemeModule
{
    constructor() {
    }
}
