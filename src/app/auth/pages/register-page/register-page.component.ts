import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  regsiterForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    console.log(this.regsiterForm.value);
    if (this.regsiterForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const {fullName='', email = '', password = '' } = this.regsiterForm.value;

    this.authService.register(fullName!, email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });

    console.log({ email, password });
  }
}
