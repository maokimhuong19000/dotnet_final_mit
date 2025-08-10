import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Angular Material modules you use
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,  // <-- add this if not present
  imports: [
    ReactiveFormsModule,  // for formGroup
    RouterModule,         // for routerLink
    MatFormFieldModule,   // for <mat-form-field>
    MatInputModule,       // for <input matInput>
    MatIconModule,        // for <mat-icon>
  ],
})
export class RegisterComponent {
  form: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.form.invalid) {
      return;
    }

    const data = { ...this.form.value, roles: ['User'] };
    this.authService.register(data).subscribe({
      next: () => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Registration failed. Please try again.');
        console.error(err);
      },
    });
  }
}
