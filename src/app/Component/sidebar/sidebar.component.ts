import { Component, ElementRef, Renderer2, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../AppGuard/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isOpen = false;
  constructor(private authService: AuthService) {}
  roles: string[] = [];
  MR_RolePresent = signal(false);
  MR_OFFICE_RolePresent = signal(false);
  DR_RolePresent = signal(false);
  ngOnInit() {
    this.roles = this.authService.getRoles();
    // this.roles.includes()
    if(this.roles.includes("MR")) this.MR_RolePresent.set(true);
    if(this.roles.includes("MR-Office")) this.MR_OFFICE_RolePresent.set(true);
    if(this.roles.includes("DR")) this.DR_RolePresent.set(true);
  }

  handgleLogout(): void{
    this.authService.logout();
  }
  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
    console.log(this.roles);
  }
}
