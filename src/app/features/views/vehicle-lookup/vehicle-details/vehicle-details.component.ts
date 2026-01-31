
import { Subscription } from 'rxjs';
import { UntypedFormGroup, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { allMaterialModules } from '../../../../shared/material-imports';
import { SkeletonModule } from 'primeng/skeleton';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-vehicle-details',
  imports: [...allMaterialModules, SkeletonModule, RippleModule],
  templateUrl: './vehicle-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './vehicle-details.component.scss'
})

export class VehicleDetailsComponent implements OnInit {
  cost = 0;
  vat = 0;
  currency = '$';
  showEditOption = false;
  isLoading = false;
  invoiceForm: UntypedFormGroup;
  invoiceFormSub: Subscription;
  invocieId: number;

  itemTableColumn: string[] = [
    'Date of Accident',
    'Location',
    'Severity',
    'Airbag Deployment',
    'Structural Damage',
    'Damage Type',
    'Vehicle Towed'
  ];

   accidentReportData = [
    {
      'Date of Accident': '2023-08-14',
      'Location': 'Houston, TX',
      'Severity': 'Moderate',
      'Airbag Deployment': 'Yes',
      'Structural Damage': 'Yes',
      'Damage Type': 'Front-end collision',
      'Vehicle Towed': 'Yes'
    },
    {
      'Date of Accident': '2022-11-30',
      'Location': 'Atlanta, GA',
      'Severity': 'Minor',
      'Airbag Deployment': 'No',
      'Structural Damage': 'No',
      'Damage Type': 'Rear-end collision',
      'Vehicle Towed': 'No'
    },
    {
      'Date of Accident': '2021-06-20',
      'Location': 'Los Angeles, CA',
      'Severity': 'Severe',
      'Airbag Deployment': 'Yes',
      'Structural Damage': 'Yes',
      'Damage Type': 'Rollover',
      'Vehicle Towed': 'Yes'
    },
    {
      'Date of Accident': '2020-03-10',
      'Location': 'Chicago, IL',
      'Severity': 'Moderate',
      'Airbag Deployment': 'No',
      'Structural Damage': 'Yes',
      'Damage Type': 'Side impact',
      'Vehicle Towed': 'Yes'
    },
    {
      'Date of Accident': '2019-12-05',
      'Location': 'Dallas, TX',
      'Severity': 'Minor',
      'Airbag Deployment': 'No',
      'Structural Damage': 'No',
      'Damage Type': 'Hit parked vehicle',
      'Vehicle Towed': 'No'
    }
  ];
  

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {

 
}
}
