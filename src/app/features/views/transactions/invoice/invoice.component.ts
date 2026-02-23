import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { PerfectScrollbarModule } from '../../../../shared/components/perfect-scrollbar';
import { allMaterialModules } from '../../../../shared/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../../../shared/services/transaction.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-invoice',
  imports: [...allMaterialModules, PerfectScrollbarModule, SkeletonModule, DropdownModule, ReactiveFormsModule, SelectModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent implements OnInit {
  transaction: any;
  isLoading = true;

  itemTableColumn: string[] = ['index', 'name', 'price', 'quantity', 'total'];

  constructor(
    private dialogRef: MatDialogRef<InvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { transactionId: string },
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadTransaction();
  }

  loadTransaction() {
    this.transactionService.getTransaction(this.data.transactionId)
      .subscribe({
        next: (response: any) => {
          console.log(response.data);
          this.transaction = response.data || response;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error loading transaction:', error);
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
  }

  close() {
    this.dialogRef.close();
  }

  print() {
    // Implement print logic
    window.print();
  }
}
