import { DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { PerfectScrollbarModule } from '../../../shared/components/perfect-scrollbar';
import { allMaterialModules } from '../../../shared/material-imports';

@Component({
  selector: 'app-settings',
  imports: [...allMaterialModules, NgClass, PerfectScrollbarModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  isLoading = false;
}
