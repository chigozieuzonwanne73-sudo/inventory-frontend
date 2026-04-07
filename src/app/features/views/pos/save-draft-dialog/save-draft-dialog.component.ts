import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface SaveDraftDialogData {
    suggestedName?: string;
}

@Component({
    selector: 'app-save-draft-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './save-draft-dialog.component.html'
})
export class SaveDraftDialogComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<SaveDraftDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SaveDraftDialogData
    ) {
        const defaultName = data?.suggestedName || `Draft ${new Date().toLocaleDateString()}`;
        this.form = this.fb.group({
            draftName: [defaultName, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]]
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave(): void {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value.draftName.trim());
        }
    }
}
