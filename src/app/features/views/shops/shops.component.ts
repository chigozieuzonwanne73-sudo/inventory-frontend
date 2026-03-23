import { DatePipe, NgClass, DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Inject, OnInit, signal } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { Subscription } from 'rxjs';
import { PerfectScrollbarModule } from '../../../shared/components/perfect-scrollbar';
import { allMaterialModules } from '../../../shared/material-imports';
import { CategoryComponent } from '../products/category/category.component';
import { ShopService } from '../../../shared/services/shop.service';
import { FilterQuery } from '../../../shared/models/filter-query';
import { MatRippleModule } from '@angular/material/core';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Shop } from '../../../shared/models/shop';
import { ShopComponent } from './shop/shop.component';

@Component({
  selector: 'app-shops',
  imports: [...allMaterialModules, DatePipe, NgClass, PerfectScrollbarModule, SkeletonModule, MatRippleModule, ToastModule, RippleModule],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.scss',
  providers: [MessageService],

})

export class ShopsComponent implements OnInit {
  cost = 0;
  vat = 0;
  currency = '$';
  showEditOption = false;
  isLoading = false;
  pageNumber: number = 0;
  pageSize: number = 0;
  totalPages: number;
  totalRecords: number;
  filterQuery: FilterQuery = {
    pageNumber: 1,
    pageSize: 10,
    querySearch: ""
  };
  invoiceForm: UntypedFormGroup;
  invoiceFormSub: Subscription;
  invocieId: number;
  shops: Shop[];
  private messageService = inject(MessageService);


  itemTableColumn: string[] = [
    'Name',
    'Location',
    'Employee Count',
    'View'
  ];



  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,

  ) { }
  viewReport(history: any) {

  }



  viewProduct(shop: Shop) {
    const dialogConfig: MatDialogConfig = {
      minWidth: '80vw',
      minHeight: '50vh',
      data: {
        shop: shop
      }
    };

    const dialogRef = this.dialog.open(ShopComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.getAllShops();
    });
  }

  ngOnInit() {
    this.getAllShops();
  }

  getAllShops() {
    this.shopService.getAllShops(this.filterQuery).subscribe({
      next: (response) => {
        this.shops = response.data.data;
        this.pageNumber = response.data.pageNumber;
        this.pageSize = response.data.PageSize;
        this.totalRecords = response.data.totalRecords;
        console.log('shops', response);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });

      }
    })
  }
}
