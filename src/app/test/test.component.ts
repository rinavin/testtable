import { Component } from "@angular/core";
import { BaseTaskMagicComponent } from "../magic/src/ui/app.baseMagicComponent";
import { TaskMagicService } from "../magic/src/services/task.magics.service";

@Component({
	selector: "mga-test",
	providers: [TaskMagicService],
	styleUrls: ["./test.component.css"],
	templateUrl: "./test.component.html"
})
export class test extends BaseTaskMagicComponent {}
