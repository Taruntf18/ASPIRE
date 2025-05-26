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
  employeeName = 'John Doe'; 
  employeeRole = 'MR Office'; 
  
  constructor(private authService: AuthService) {}
  
  roles: string[] = [];
  MR_RolePresent = signal(false);
  MR_OFFICE_RolePresent = signal(false);
  DR_RolePresent = signal(false);
  
  ngOnInit() {
    this.roles = this.authService.getRoles();
    if(this.roles.includes("MR")) this.MR_RolePresent.set(true);
    if(this.roles.includes("MR-Office")) this.MR_OFFICE_RolePresent.set(true);
    if(this.roles.includes("DR")) this.DR_RolePresent.set(true);
    
    // Set employee details based on role
    if (this.MR_OFFICE_RolePresent()) this.employeeRole = "MR Office";
    else if (this.MR_RolePresent()) this.employeeRole = "MR";
    else if (this.DR_RolePresent()) this.employeeRole = "DR";
  }

  isAdmin(): boolean {
    // Add your admin role check logic here
    return this.roles.includes("Admin");
  }

  handgleLogout(): void {
    this.authService.logout();
  }
  
  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }
}