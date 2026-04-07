import { Component } from '@angular/core';
import { allMaterialModules } from '../../../shared/material-imports';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reports',
  imports: [...allMaterialModules, RouterModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

}
