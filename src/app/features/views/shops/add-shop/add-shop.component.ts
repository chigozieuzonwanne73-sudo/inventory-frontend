import { Component, OnInit, inject } from '@angular/core';
import { allMaterialModules } from '../../../../shared/material-imports';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { PerfectScrollbarModule } from '../../../../shared/components/perfect-scrollbar';
import { MessageService } from 'primeng/api';
import { ShopService } from '../../../../shared/services/shop.service';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-add-shop',
  imports: [
    ...allMaterialModules,
    DatePipe,
    NgClass,
    PerfectScrollbarModule,
    SkeletonModule,
    NgIf,
    ReactiveFormsModule,
    ToastModule,
    RippleModule,
    MatRippleModule
  ],
  templateUrl: './add-shop.component.html',
  styleUrl: './add-shop.component.scss',
  providers: [MessageService]
})
export class AddShopComponent implements OnInit {
  addShopForm: FormGroup;
  isLoading = false;

  private fb = inject(FormBuilder);
  private shopService = inject(ShopService);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.addShopForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.addShopForm.invalid) {
      this.addShopForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.shopService.createShop(this.addShopForm.value).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Shop created successfully'
        });

        // Reset the form properly - this clears touched state and values
        this.addShopForm.reset();

        // Optional: Reset to pristine and untouched state explicitly
        Object.keys(this.addShopForm.controls).forEach(key => {
          this.addShopForm.controls[key].setErrors(null);
        });

        this.isLoading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Failed to create shop'
        });
        this.isLoading = false;
      }
    });
  }
}