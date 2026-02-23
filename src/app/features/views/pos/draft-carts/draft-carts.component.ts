import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';

import { allMaterialModules } from '../../../../shared/material-imports';
import { CheckoutService, DraftCartSummary } from '../../../../shared/services/checkout.service';
import { JwtAuthService } from '../../../../shared/services/auth/jwt-auth.service';
import { RenameDraftDialogComponent } from '../rename-draft-dialog/rename-draft-dialog.component';

@Component({
    selector: 'app-draft-carts',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        DatePipe,
        CurrencyPipe,
        ...allMaterialModules,
        ToastModule,
        ConfirmDialogModule,
        SkeletonModule,
        MatDialogModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './draft-carts.component.html',
    styleUrl: './draft-carts.component.scss'
})
export class DraftCartsComponent implements OnInit {
    draftCarts: DraftCartSummary[] = [];
    loading = true;

    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);
    private dialog = inject(MatDialog);

    constructor(
        private checkoutService: CheckoutService,
        private auth: JwtAuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadDraftCarts();
    }

    loadDraftCarts(): void {
        this.loading = true;
        this.checkoutService.getDraftCarts().subscribe({
            next: (res) => {
                console.log('deaftcarts', res);
                this.draftCarts = res.data?.draftCarts || [];
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading draft carts:', err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load draft carts'
                });
                this.loading = false;
            }
        });
    }

    restoreDraft(draft: DraftCartSummary): void {
        this.confirmationService.confirm({
            message: `Restore "${draft.draftName}" to your current cart? This will replace your current cart.`,
            header: 'Restore Draft',
            icon: 'pi pi-refresh',
            acceptLabel: 'Restore',
            rejectLabel: 'Cancel',
            accept: () => {
                this.checkoutService.restoreDraftCart({ draftCartId: draft.cartId }).subscribe({
                    next: (res) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Draft Restored',
                            detail: `"${draft.draftName}" has been restored to your cart`
                        });
                        setTimeout(() => {
                            this.router.navigate(['/cashier/pos']);
                        }, 1000);
                    },
                    error: (err) => {
                        console.error('Error restoring draft:', err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error?.message || 'Failed to restore draft'
                        });
                    }
                });
            }
        });
    }

    renameDraft(draft: DraftCartSummary): void {
        const dialogRef = this.dialog.open(RenameDraftDialogComponent, {
            width: '400px',
            data: { currentName: draft.draftName }
        });

        dialogRef.afterClosed().subscribe((newName: string) => {
            if (newName && newName !== draft.draftName) {
                this.checkoutService.renameDraftCart({
                    draftCartId: draft.cartId,
                    newName: newName
                }).subscribe({
                    next: (res) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Draft Renamed',
                            detail: `Draft renamed to "${newName}"`
                        });
                        this.loadDraftCarts();
                    },
                    error: (err) => {
                        console.error('Error renaming draft:', err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error?.message || 'Failed to rename draft'
                        });
                    }
                });
            }
        });
    }

    deleteDraft(draft: DraftCartSummary): void {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete "${draft.draftName}"? This action cannot be undone.`,
            header: 'Delete Draft',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Delete',
            rejectLabel: 'Cancel',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.checkoutService.deleteDraftCart({ draftCartId: draft.cartId }).subscribe({
                    next: (res) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Draft Deleted',
                            detail: `"${draft.draftName}" has been deleted`
                        });
                        this.loadDraftCarts();
                    },
                    error: (err) => {
                        console.error('Error deleting draft:', err);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error?.message || 'Failed to delete draft'
                        });
                    }
                });
            }
        });
    }
}
