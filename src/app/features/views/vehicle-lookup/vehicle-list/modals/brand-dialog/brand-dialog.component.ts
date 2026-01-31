import { Component } from '@angular/core';
import { allMaterialModules } from '../../../../../../shared/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { FilterOverviewComponent } from '../filter-overview/filter-overview.component';

@Component({
  selector: 'app-brand-dialog',
  imports: [...allMaterialModules],
  templateUrl: './brand-dialog.component.html',
  styleUrl: './brand-dialog.component.scss'
})
export class BrandDialogComponent {
constructor(public dialog: MatDialog) {

}
onReturn(){

  this.dialog.closeAll();
  this.dialog.open(FilterOverviewComponent, {
    width: '80%',
  });

}
}
