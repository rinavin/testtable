import { Component } from "@angular/core";
import { BaseTaskMagicComponent } from "../magic/src/ui/app.baseMagicComponent";
import { TaskMagicService } from "../magic/src/services/task.magics.service";
import {MatTableDataSource} from '@angular/material';

@Component({
	selector: "mga-table",
	providers: [TaskMagicService],
	styleUrls: ["./table.component.css"],
	templateUrl: "./table.component.html"
})
export class table extends BaseTaskMagicComponent {

  displayedColumns = ['a', 'n'];
  dataSource = new MatTableDataSource<Element>(this.task.Records.list);
  refreshDataSource()
  {
    this.dataSource = new MatTableDataSource<Element>(this.task.Records.list);
  }
}


