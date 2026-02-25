import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  searchValue = input<string>('');
  isDark = input<boolean>(false);
  searchQuery = output<string>();
  themeToggle = output<void>();

  onSearchInput(value: string): void {
    this.searchQuery.emit(value);
  }

  onThemeToggle(): void {
    this.themeToggle.emit();
  }
}
