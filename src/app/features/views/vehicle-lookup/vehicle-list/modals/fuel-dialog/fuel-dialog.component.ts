import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { allMaterialModules } from '../../../../../../shared/material-imports';
import { FilterOverviewComponent } from '../filter-overview/filter-overview.component';

@Component({
  selector: 'app-fuel-dialog',
  imports: [...allMaterialModules],
  templateUrl: './fuel-dialog.component.html',
  styleUrl: './fuel-dialog.component.scss'
})
export class FuelDialogComponent {
  constructor(public dialog: MatDialog) {

  }
  onReturn(){
  
    this.dialog.closeAll();
    this.dialog.open(FilterOverviewComponent, {
      width: '80%',
    });
  
  }
}
