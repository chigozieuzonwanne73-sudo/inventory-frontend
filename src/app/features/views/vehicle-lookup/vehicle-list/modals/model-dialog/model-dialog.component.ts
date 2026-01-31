import { Component } from '@angular/core';
import { allMaterialModules } from '../../../../../../shared/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { FilterOverviewComponent } from '../filter-overview/filter-overview.component';

@Component({
  selector: 'app-model-dialog',
  imports: [...allMaterialModules],
  templateUrl: './model-dialog.component.html',
  styleUrl: './model-dialog.component.scss'
})
export class ModelDialogComponent {
constructor(private dialog: MatDialog) {

}
onReturn(){

  this.dialog.closeAll();
  this.dialog.open(FilterOverviewComponent, {
    width: '80%',
  });

}
}
