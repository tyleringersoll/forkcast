import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats large numbers for display: e.g. 12400 → "12.4k", 1500000 → "1.5M".
 * Used for star counts, fork counts, etc.
 */
@Pipe({
  name: 'formatStat',
  standalone: true,
})
export class FormatStatPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    const count = value ?? 0;
    if (count >= 1_000_000) {
      return (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (count >= 1_000) {
      return (count / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return String(count);
  }
}
