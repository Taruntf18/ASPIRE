import { Component, signal } from '@angular/core';
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
  loginUserData: any = {};
  roles: string[] = [];
  MR_RolePresent = signal(false);
  MR_OFFICE_RolePresent = signal(false);
  DR_RolePresent = signal(false);
  
  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.loginUserData = this.authService.getUser();
    console.log(this.loginUserData);
    
    this.roles = this.authService.getRoles();
    if(this.roles.includes("MR")) this.MR_RolePresent.set(true);
    if(this.roles.includes("MR-Office")) this.MR_OFFICE_RolePresent.set(true);
    if(this.roles.includes("DR")) this.DR_RolePresent.set(true);
  }

  isAdmin(): boolean {
    return this.roles.includes("Admin");
  }

  handgleLogout(): void {
    this.authService.logout();
  }
  
  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }
}