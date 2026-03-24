import { Component, OnInit, OnDestroy } from '@angular/core';
import { allMaterialModules } from '../../../shared/material-imports';
import { PerfectScrollbarModule } from '../../../shared/components/perfect-scrollbar';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../shared/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  imports: [...allMaterialModules, PerfectScrollbarModule, SkeletonModule, ToastModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [MessageService]
})
export class UsersComponent implements OnInit, OnDestroy {
  users: any[] = [];
  isLoading = false;
  itemTableColumn: string[] = ['Name', 'Email', 'Role', 'Shop'];

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
    this.userService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          console.log('users', response.data)
          this.users = response.data || response || [];
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
}
