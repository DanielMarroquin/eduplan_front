import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export default class SignInComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  onSignIn() {
    if (this.username && this.password) {
      this.authService.signIn(this.username, this.password).subscribe({
        next: (response) => {
          if (response) {
            console.log(response);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Inicio de sesión fallido:', response);
          }
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      });
    } else {
      console.error('El nombre de usuario y la contraseña son obligatorios.');
    }
  }



}
