import {Component, ViewChild} from '@angular/core';
import { BaseTaskMagicComponent } from "../magic/src/ui/app.baseMagicComponent";
import { TaskMagicService } from "../magic/src/services/task.magics.service";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
	selector: "ma-table",
	providers: [TaskMagicService],
	styleUrls: ["./table.component.css"],
	templateUrl: "./table.component.html"
})
export class table extends BaseTaskMagicComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['a', 'n'];
  dataSource = new MatTableDataSource<Element>(this.task.Records.list);



  refreshDataSource()  {
    this.dataSource.data = this.task.Records.list;
    this.dataSource.paginator = this.paginator;

  }


}


