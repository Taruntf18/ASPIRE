import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent {
  isCollapsed = false;
  isFooterExpanded = false;
  selectedItem: string | null = null;

  selectItem(item: string) {
    this.selectedItem = item;
    // You can add navigation logic here
  }

  toggleFooter() {
    this.isFooterExpanded = !this.isFooterExpanded;
  }
}