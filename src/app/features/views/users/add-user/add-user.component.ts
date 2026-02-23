import { Component, OnInit, inject } from '@angular/core';
import { allMaterialModules } from '../../../../shared/material-imports';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { PerfectScrollbarModule } from '../../../../shared/components/perfect-scrollbar';
import { MessageService } from 'primeng/api';
import { ShopService } from '../../../../shared/services/shop.service';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MatRippleModule } from '@angular/material/core';
import { DropdownModule } from 'primeng/dropdown';
import { Shop } from '../../../../shared/models/shop';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-add-user',
  imports: [
    ...allMaterialModules,
    DatePipe,
    NgClass,
    PerfectScrollbarModule,
    SkeletonModule,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    RippleModule,
    MatRippleModule,
    DropdownModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  providers: [MessageService]
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  addCashierForm: FormGroup;
  isLoading = false;
  shops: Shop[] = [];
  selectedShop: Shop | null = null;

  private fb = inject(FormBuilder);
  private shopService = inject(ShopService);
  private userService = inject(UserService);
  private messageService = inject(MessageService);


  getAllShops() {
    this.shopService.getAllShops({ pageNumber: 1, pageSize: 1000, querySearch: '' }).subscribe({
      next: (response) => {
        this.shops = response.data.data;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load shops'
        });
      }
    });
  }

  ngOnInit() {
    this.addUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      shopId: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.addCashierForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      shopId: [''],
    });

    this.getAllShops();
  }

  onAddCashier() {
    this.addCashierForm.patchValue({
      firstName: this.addUserForm.controls['firstName'].value,
      lastName: this.addUserForm.controls['lastName'].value,
    })

    this.isLoading = true;

    this.userService.addCashier(this.addCashierForm.value).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Cashier created successfully'
        });

        // Properly reset the form
        this.addUserForm.reset();
        this.selectedShop = null;

        // Mark form as untouched and pristine
        this.addUserForm.markAsUntouched();
        this.addUserForm.markAsPristine();

        // Clear all errors
        Object.keys(this.addUserForm.controls).forEach(key => {
          this.addUserForm.controls[key].setErrors(null);
          this.addUserForm.controls[key].markAsUntouched();
          this.addUserForm.controls[key].markAsPristine();
        });

        this.isLoading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Failed to add cashier'
        });
        this.isLoading = false;
      }
    });
  }



  onShopChange(event: any) {
    console.log('Selected shop:', event.value); // Debug
    if (event.value && event.value.id) {
      this.addUserForm.patchValue({ shopId: event.value.id });
      this.addCashierForm.patchValue({ shopId: event.value.id });
      console.log('Form value:', this.addUserForm.value); // Debug
    }
  }

  onSubmit() {
    if (this.addUserForm.invalid) {
      this.addUserForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.userService.createUser(this.addUserForm.value).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User created successfully'
        });

        // Properly reset the form
        this.addUserForm.reset();
        this.selectedShop = null;

        // Mark form as untouched and pristine
        this.addUserForm.markAsUntouched();
        this.addUserForm.markAsPristine();

        // Clear all errors
        Object.keys(this.addUserForm.controls).forEach(key => {
          this.addUserForm.controls[key].setErrors(null);
          this.addUserForm.controls[key].markAsUntouched();
          this.addUserForm.controls[key].markAsPristine();
        });

        this.isLoading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Failed to create user'
        });
        this.isLoading = false;
      }
    });
  }
}