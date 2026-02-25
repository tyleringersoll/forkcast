import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  placeholder = input<string>('Search...');
  value = input<string>('');
  searchChange = output<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchChange.emit(target?.value ?? '');
  }
}
