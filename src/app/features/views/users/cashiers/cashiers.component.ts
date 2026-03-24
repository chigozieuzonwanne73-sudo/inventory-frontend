import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../../shared/services/user.service';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { PerfectScrollbarModule } from '../../../../shared/components/perfect-scrollbar';
import { allMaterialModules } from '../../../../shared/material-imports';

@Component({
  selector: 'app-cashiers',
  imports: [...allMaterialModules, PerfectScrollbarModule, SkeletonModule, ToastModule],
  providers: [MessageService],

  templateUrl: './cashiers.component.html',
  styleUrl: './cashiers.component.scss'
})

export class CashiersComponent implements OnInit, OnDestroy {
  users: any[] = [];
  isLoading = false;
  itemTableColumn: string[] = ['Name', 'Action'];

  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getAllCashiers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('users', response.data)
          this.users = response.data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading users:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: 'Failed to load users'
          });
          this.isLoading = false;
        }
      });
  }

  deleteCashier(cashier: any) {
    this.isLoading = true;
    this.userService.deleteCashier(cashier.id)
      .subscribe({
        next: (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'SUCCESS',
            detail: 'Cashier successfully deleted'
          });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading users:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'ERROR',
            detail: error.error.message
          });
          this.isLoading = false;
        }
      });
  }
}

