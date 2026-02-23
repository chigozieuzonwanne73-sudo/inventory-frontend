
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { greatAnimations } from '../../../shared/animations/egret-animations';
import { allMaterialModules, commonMaterialModules } from '../../../shared/material-imports';
import { NgClass, NgIf } from '@angular/common';
import { DividerComponent } from '../../../shared/components/divider/divider.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, NgIf, RouterLink, NgClass, DividerComponent, ...allMaterialModules, MatRippleModule, ToastModule, RippleModule],
  templateUrl: './signin.component.html',
  providers: [MessageService],

  styleUrl: './signin.component.scss',
  animations: greatAnimations,
})

export class SigninComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatProgressBar)
  progressBar: MatProgressBar;
  @ViewChild(MatButton)
  submitButton: MatButton;
  isLoading = false;
  private messageService = inject(MessageService);


  signupForm: UntypedFormGroup;
  hidePassword = true;
  errorMsg = '';
  private _unsubscribeAll: Subject<any>;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private jwtAuth: JwtAuthService,
  ) {
    this._unsubscribeAll = new Subject();
    this.signupForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      remember: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  ngAfterViewInit() {
    // Uncomment if you want auto sign-in
    // this.autoSignIn();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(1);
    this._unsubscribeAll.complete();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signinData = this.signupForm.value;

      this.submitButton.disabled = true;
      this.progressBar.mode = 'indeterminate';
      this.isLoading = true;

      this.jwtAuth.signin(signinData.email, signinData.password)
        .subscribe({
          next: (response) => {
            // Check if there's a return URL from auth guard
            const returnUrl = this.route.snapshot.queryParams['return'];

            if (returnUrl && returnUrl !== '/') {
              // Navigate to the return URL (where user was trying to go)
              this.router.navigateByUrl(returnUrl);
            } else {
              // Navigate by role to default dashboard
              this.navigateByRole(response.data.role);
            }

            this.isLoading = false;
          },
          error: (err) => {
            this.submitButton.disabled = false;
            this.progressBar.mode = 'determinate';
            this.errorMsg = err.error.message;
            console.log('LE ERR:', err.message);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: this.errorMsg
            });
            this.isLoading = false;
          }
        });
    }
  }

  private navigateByRole(role: string) {
    switch (role) {
      case 'OWNER':
      case 'Admin':
      case 'DEVELOPER':
        this.router.navigate(['/owner/reports/sales']);
        break;
      case 'CASHIER':
        this.router.navigate(['/cashier/products/all']);
        break;
      default:
        this.router.navigate(['/auth/signin']);
    }
  }

  autoSignIn() {

  }

}

