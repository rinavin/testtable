import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {MagicModule} from "./magic/magic.core.module";
import {AppComponent} from "./app.component";
import {DynamicModule} from "ng-dynamic-component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ComponentsList} from "./ComponentList";
import {ThemeModule} from "./theme.module";
import {TableBasicExample} from './basicTable/table-basic-example';

const comps = ComponentsList.getAllComponents();

@NgModule({
    declarations: [AppComponent, TableBasicExample, ...comps],
    imports     : [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        DynamicModule.withComponents(comps),
        MagicModule.forRoot(),

        ThemeModule,
    ],
    exports     : [FormsModule, ReactiveFormsModule],
    providers   : [],

    bootstrap: [AppComponent]
})
export class AppModule
{
    constructor() {}
}
