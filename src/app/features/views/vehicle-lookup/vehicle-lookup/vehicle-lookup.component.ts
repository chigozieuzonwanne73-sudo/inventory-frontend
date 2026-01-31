import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DividerComponent } from '../../../../shared/components/divider/divider.component';
import { allMaterialModules } from '../../../../shared/material-imports';
import { PerfectScrollbarModule } from '../../../../shared/components/perfect-scrollbar';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-vehicle-lookup',
  imports: [ReactiveFormsModule,NgClass, RouterOutlet, PerfectScrollbarModule, ...allMaterialModules],
  templateUrl: './vehicle-lookup.component.html',
  styleUrl: './vehicle-lookup.component.scss'
  , changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleLookupComponent implements OnInit {

  isLoading = false;
  constructor() { 
  }

  ngOnInit() {
    this.updateSearchTerm("");
  }

  updateSearchTerm(term: string) {
    // This method can be used to update the search term in the component.
    // For example, you might want to filter a list of vehicles based on the search term.
    console.log('Search term updated:', term);
    // Implement your logic here, such as calling a service to fetch filtered results.
  }


}




