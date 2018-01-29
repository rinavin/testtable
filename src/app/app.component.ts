import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {MagicEngine} from "./magic/src/services/magic.engine";
import {ComponentsList} from './ComponentList';
import {BaseTaskMagicComponent} from "./magic/src/ui/app.baseMagicComponent";

declare let myExtObject: any;

@Component({
  selector: 'app-root',
  template: `
    <!--<table-basic-example></table-basic-example>-->
    <ndc-dynamic [ndcDynamicComponent]="MainComp"
                 [ndcDynamicInputs]="MainCompParameters">
    </ndc-dynamic>
 `
})
export class AppComponent implements OnInit
{//extends BaseTaskMagicComponent implements OnInit {
  private MainComp: Component;
  private MainCompParameters: any;

  constructor(protected magic: MagicEngine,
              protected changeDetectorRef: ChangeDetectorRef) {

		this.initializeMagic();
		BaseTaskMagicComponent.componentListBase = new ComponentsList();
	}

  ngOnInit() {
    this.magic.startMagic();
  }

	initializeMagic() {
		this.magic.registerOpenFormCallback((formName: string, taskId: string, taskDescription: string) => {
			this.InjectComponent(formName, taskId, taskDescription);
		});

		this.magic.registerShowMessageBox(msg => {
			alert(msg);
		});
	}

	private InjectComponent(formName: string, taskId: string, taskDescription: string) {
    this.MainComp = BaseTaskMagicComponent.componentListBase.getComponents(formName);
    this.MainCompParameters = {myTaskId: taskId, taskDescription: taskDescription};

    this.changeDetectorRef.detectChanges();
	}
}

