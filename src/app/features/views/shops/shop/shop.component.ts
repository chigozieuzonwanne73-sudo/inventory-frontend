import { DatePipe, DOCUMENT, NgClass, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormArray, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';
import { PerfectScrollbarModule } from '../../../../shared/components/perfect-scrollbar';
import { allMaterialModules } from '../../../../shared/material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditShop, Shop } from '../../../../shared/models/shop';
import { ShopService } from '../../../../shared/services/shop.service';
import { MatRippleModule } from '@angular/material/core';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shop',
  imports: [...allMaterialModules, DatePipe, NgClass, PerfectScrollbarModule, SkeletonModule, NgIf, ReactiveFormsModule, MatRippleModule, ToastModule, RippleModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  providers: [MessageService],
})
export class ShopComponent implements OnInit, OnDestroy {
  showEditOption = false;
  isLoading = false;
  shop: Shop;
  editShop: FormGroup;
  shopId: string;
  private messageService = inject(MessageService);

  itemTableColumn: string[] = [
    'Index',
    'Firstname',
    'Lastname',
    'Email',
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(MAT_DIALOG_DATA) public data: { shop: Shop },
    private dialogRef: MatDialogRef<ShopComponent>
  ) {
    this.shopId = data.shop.id;
    this.editShop = this.fb.group({
      shopId: ['', Validators.required],
      name: ['', Validators.required],
      location: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getShop(this.shopId);
  }

  ngOnDestroy() {
  }

  onEditAddress() {
    console.log(this.shop.name);
    console.log(this.shop.location);
    this.editShop.controls['shopId'].setValue(this.shop.id);
    this.editShop.controls['name'].setValue(this.shop.name);
    this.editShop.controls['location'].setValue(this.shop.location);
    this.showEditOption = !this.showEditOption;
  }

  saveShopChanges() {
    this.shopService.editShop(this.editShop.value).subscribe({
      next: (response) => {
        console.log('saveShopresult', response);
        if (response.status == "SUCCESS") {
          this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: response.message });
        }
        this.getShop(this.shopId);
        this.showEditOption = !this.showEditOption;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      }
    })
  }

  print() {
    window.print();
  }

  getShop(id: string) {
    this.shopService.getShop(id).subscribe({
      next: (response) => {
        this.shop = response.data;
        console.log('singleShop', response.data);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      }
    })
  }
}
