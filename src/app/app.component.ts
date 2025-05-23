import { Component, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { AuthService } from './Component/AppGuard/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  userLoggedin = toSignal(this.authService.getLoginStatus(), { initialValue: false });
  constructor(private authService: AuthService) {}
}
