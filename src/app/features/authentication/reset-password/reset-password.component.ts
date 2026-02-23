
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { greatAnimations } from '../../../shared/animations/egret-animations';
import { RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { allMaterialModules } from '../../../shared/material-imports';



@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, NgIf, NgClass, RouterLink, ...allMaterialModules, MatRippleModule],
  templateUrl: './reset-password.component.html',
  animations: greatAnimations,
  styleUrl: './reset-password.component.scss'
})

export class ResetPasswordComponent implements OnInit {
  userEmail: string;
  errorMsg: string = '';
  hidePassword = true;
  isLoading = false;
  forgotPasswordForm: FormGroup;
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.email]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submitEmail() {
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }
}


