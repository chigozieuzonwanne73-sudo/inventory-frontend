
import { Subscription } from 'rxjs';
import { UntypedFormGroup, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { DatePipe, DOCUMENT, NgClass } from '@angular/common';
import { allMaterialModules } from '../../../shared/material-imports';
import PerfectScrollbar from 'perfect-scrollbar';
import { PerfectScrollbarModule } from '../../../shared/components/perfect-scrollbar';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-lookup-history',
  imports: [...allMaterialModules, DatePipe, NgClass, PerfectScrollbarModule, SkeletonModule],
  templateUrl: './lookup-history.component.html',
  styleUrl: './lookup-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LookupHistoryComponent implements OnInit {
  cost = 0;
  vat = 0;
  currency = '$';
  showEditOption = false;
  isLoading = false;
  invoiceForm: UntypedFormGroup;
  invoiceFormSub: Subscription;
  invocieId: number;

  itemTableColumn: string[] = [
    'VIN',
    'Lookup Date',
    'Result Summary',
    'Amount Paid',
    'View'
  ];

  lookupHistory = [
    {
      vin: '1HGCM82633A004352',
      lookupDate: new Date('2025-07-10T10:23:00'),
      resultSummary: 'No Accidents Reported',
      amountPaid: 1500,
      reportType: 'Full Report'
    },
    {
      vin: 'WBA3A5C54FF607296',
      lookupDate: new Date('2025-07-09T14:45:00'),
      resultSummary: 'Minor Accident - Rear Bumper',
      amountPaid: 1500,
      reportType: 'Full Report'
    },
    {
      vin: 'JHMFA16586S012345',
      lookupDate: new Date('2025-07-08T09:12:00'),
      resultSummary: 'No Damage History',
      amountPaid: 1000,
      reportType: 'Basic Report'
    },
    {
      vin: '2C3KA43R78H123456',
      lookupDate: new Date('2025-07-06T17:30:00'),
      resultSummary: 'Structural Damage, Airbags Deployed',
      amountPaid: 1500,
      reportType: 'Full Report'
    },
    {
      vin: '1FTSW21R08EC12345',
      lookupDate: new Date('2025-07-04T13:05:00'),
      resultSummary: 'Towed After Collision',
      amountPaid: 1000,
      reportType: 'Basic Report'
    }
  ];
  

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}
viewReport(history: any){
  
}
  ngOnInit() {

 
}
}




