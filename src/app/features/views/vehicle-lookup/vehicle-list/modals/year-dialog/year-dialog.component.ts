import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { allMaterialModules } from '../../../../../../shared/material-imports';
import { FilterOverviewComponent } from '../filter-overview/filter-overview.component';

@Component({
  selector: 'app-year-dialog',
  imports: [...allMaterialModules],
  templateUrl: './year-dialog.component.html',
  styleUrl: './year-dialog.component.scss'
})
export class YearDialogComponent {
constructor(private dialog: MatDialog) {

}
onReturn(){

  this.dialog.closeAll();
  this.dialog.open(FilterOverviewComponent, {
    width: '80%',
  });

}
}
