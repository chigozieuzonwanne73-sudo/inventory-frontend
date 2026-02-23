
import { ErrorStateMatcher } from '@angular/material/core';
import { Validators, UntypedFormGroup, NgForm, FormGroupDirective, UntypedFormControl, AbstractControl, ValidationErrors, ReactiveFormsModule } from "@angular/forms";
import { UntypedFormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { greatAnimations } from '../../../shared/animations/egret-animations';
import { NgIf, NgClass } from '@angular/common';
import { DividerComponent } from '../../../shared/components/divider/divider.component';
import { allMaterialModules } from '../../../shared/material-imports';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgIf, RouterLink, NgClass, ...allMaterialModules, DividerComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  animations: greatAnimations,
})

export class SignupComponent implements OnInit {
  signupForm: UntypedFormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      agreed: [false, Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Handle form submission
      console.log(this.signupForm.value);
    }
  }
}