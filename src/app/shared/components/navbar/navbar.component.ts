import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  isCustomer: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isCustomer = this.authService.getUserRole() === 'CUSTOMER';
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.isCustomer = false;
    this.router.navigate(['/home']);
  }

  goToCart(): void {
    if (this.isCustomer) {
      this.router.navigate(['/customer/cart']);
    }
  }
}
