import { Component } from '@angular/core';
import { allMaterialModules } from '../../../../../../shared/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { FilterOverviewComponent } from '../filter-overview/filter-overview.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-location-dialog',
  imports: [...allMaterialModules, NgIf],
  templateUrl: './location-dialog.component.html',
  styleUrl: './location-dialog.component.scss'
})
export class LocationDialogComponent {
showLga: boolean = false;
 constructor (public dialog: MatDialog,) {

 }

 onReturn(){
  if(this.showLga) {
    this.showLga = false;
  }
  else{
    this.dialog.closeAll();
    this.dialog.open(FilterOverviewComponent, {
      width: '80%',
    });
  }

 }
 displayLga(){
  this.showLga = !this.showLga;
 }
}
