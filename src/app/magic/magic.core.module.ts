import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MagicEngine} from "./src/services/magic.engine";
import {MagicFullControlDirective} from "./src/ui/magic-fullcontrol-directive.directive";
import {MagicNoControlDirective} from "./src/ui/magic-nocontrol-directive.directive";
import {MagicDefaultValueAccessor, MagicFormControlNameDirective} from "./src/ui/magic.form-control-name.directive";

import {ComponentsList} from '../ComponentList';

const comps = ComponentsList.getAllComponents();

const decs = [
  MagicFullControlDirective,
  MagicNoControlDirective,
  MagicDefaultValueAccessor,
  MagicFormControlNameDirective,

];

@NgModule({
  declarations:decs,
  exports: decs,
  imports:[
    CommonModule
  ],
  entryComponents: comps
})
export class MagicModule{
   static forRoot(){
      return {
         ngModule: MagicModule,
         providers: [
            MagicEngine,
         ]
      }
   }
}
