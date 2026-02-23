import { DatePipe, DOCUMENT, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { PerfectScrollbarModule } from '../../../../shared/components/perfect-scrollbar';
import { allMaterialModules } from '../../../../shared/material-imports';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { Catgeory } from '../../../../shared/models/category';
import { CategoryService } from '../../../../shared/services/category.service';
import { FilterQuery } from '../../../../shared/models/filter-query';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-categories',
  imports: [
    ...allMaterialModules,
    DatePipe,
    NgClass,
    PerfectScrollbarModule,
    SkeletonModule,
    ToastModule,
    RippleModule,
    MatRippleModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  providers: [MessageService]
})
export class CategoriesComponent implements OnInit {
  showEditOption = false;
  isLoading = false;
  categories: Catgeory[] = [];
  totalRecords = 0;
  pageSize = 10;
  pageNumber = 1;

  filterQuery: FilterQuery = {
    pageNumber: 1,
    pageSize: 10,
    querySearch: ""
  };

  itemTableColumn: string[] = [
    'Name',
    'Description',
    'View'
  ];

  private categoryService = inject(CategoryService);
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);
  public dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.isLoading = true;
    this.categoryService.getAllCategories(this.filterQuery).subscribe({
      next: (response) => {
        this.categories = response.data.data;
        this.totalRecords = response.data.totalRecords;
        this.pageSize = this.filterQuery.pageSize;
        this.pageNumber = this.filterQuery.pageNumber;
        this.isLoading = false;
        this.cdr.markForCheck();
        console.log('Categories loaded:', response.data);
      },
      error: (err) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Failed to load categories'
        });
      }
    });
  }

  onPageChange(event: any) {
    this.filterQuery.pageNumber = event.pageIndex + 1;
    this.filterQuery.pageSize = event.pageSize;
    this.getAllCategories();
  }

  onSearch(searchTerm: string) {
    this.filterQuery.querySearch = searchTerm;
    this.filterQuery.pageNumber = 1; // Reset to first page on search
    this.getAllCategories();
  }

  viewProduct(category: Catgeory) {
    this.editCategory(category);
  }

  addCategory() {
    const dialogConfig: MatDialogConfig = {
      minWidth: '80vw',
      minHeight: '50vh',
      data: {
        category: null
      }
    };

    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.messageService.add({
        severity: 'success',
        summary: 'SUCCESS',
        detail: result.message
      });
      this.getAllCategories(); // Refresh list after adding
    });
  }





  editCategory(category: Catgeory) {
    const dialogConfig: MatDialogConfig = {
      minWidth: '80vw',
      minHeight: '50vh',
      data: {
        category: category
      }
    };

    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.messageService.add({
        severity: 'success',
        summary: 'SUCCESS',
        detail: result.message
      });
      this.getAllCategories(); // Refresh list after adding
    });
  }
}