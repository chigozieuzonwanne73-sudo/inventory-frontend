import { Component } from '@angular/core';
import { allMaterialModules } from '../../../../../../shared/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { LocationDialogComponent } from '../location-dialog/location-dialog.component';
import { PriceDialogComponent } from '../price-dialog/price-dialog.component';
import { BrandDialogComponent } from '../brand-dialog/brand-dialog.component';
import { ModelDialogComponent } from '../model-dialog/model-dialog.component';
import { YearDialogComponent } from '../year-dialog/year-dialog.component';
import { ConditionDialogComponent } from '../condition-dialog/condition-dialog.component';
import { TransmissionDialogComponent } from '../transmission-dialog/transmission-dialog.component';
import { BodyDialogComponent } from '../body-dialog/body-dialog.component';
import { FuelDialogComponent } from '../fuel-dialog/fuel-dialog.component';

@Component({
  selector: 'app-filter-overview',
  imports: [...allMaterialModules],
  templateUrl: './filter-overview.component.html',
  styleUrl: './filter-overview.component.scss'
})
export class FilterOverviewComponent {

  constructor(    
        public dialog: MatDialog,
    ) {

  }
  buttonClicked(event: MouseEvent) {
    console.log('Button clicked!');
    event.stopPropagation();
  }
  selectorClicked() {
    console.log('Selector clicked!');
  }
  openLocationDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      width: '60%',
    });
  }

  openBrandDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(BrandDialogComponent, {
      width: '60%',
    });
  }

  openYearDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(YearDialogComponent, {
      width: '60%',
    });
  }

  openModelDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ModelDialogComponent, {
      width: '60%',
    });
  }
  
  openConditionDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ConditionDialogComponent, {
      width: '60%',
    });
  }

  openTransmissionDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(TransmissionDialogComponent, {
      width: '60%',
    });
  }

  openBodyDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(BodyDialogComponent, {
      width: '60%',
    });
  }

  openFuelDialog() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(FuelDialogComponent, {
      width: '60%',
    });
  }
    openPriceDialog() {
      this.dialog.closeAll();
      const dialogRef = this.dialog.open(PriceDialogComponent, {
        width: '60%',
      });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
     
    });
  }
  
}
