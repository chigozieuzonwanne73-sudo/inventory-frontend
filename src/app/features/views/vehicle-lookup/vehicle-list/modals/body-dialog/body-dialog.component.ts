import { Component } from '@angular/core';
import { allMaterialModules } from '../../../../../../shared/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { FilterOverviewComponent } from '../filter-overview/filter-overview.component';

@Component({
  selector: 'app-body-dialog',
  imports: [...allMaterialModules],
  templateUrl: './body-dialog.component.html',
  styleUrl: './body-dialog.component.scss'
})
export class BodyDialogComponent {
  constructor(public dialog: MatDialog) {

  }
  onReturn(){
  
    this.dialog.closeAll();
    this.dialog.open(FilterOverviewComponent, {
      width: '80%',
    });
  
  }
}
