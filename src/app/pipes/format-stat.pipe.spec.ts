import { FormatStatPipe } from './format-stat.pipe';

describe('FormatStatPipe', () => {
  const pipe = new FormatStatPipe();

  it('formats values under 1,000 as-is', () => {
    expect(pipe.transform(0)).toBe('0');
    expect(pipe.transform(1)).toBe('1');
    expect(pipe.transform(999)).toBe('999');
  });

  it('formats thousands with k suffix', () => {
    expect(pipe.transform(1_000)).toBe('1k');
    expect(pipe.transform(1_500)).toBe('1.5k');
    expect(pipe.transform(12_400)).toBe('12.4k');
    expect(pipe.transform(999_000)).toBe('999k');
  });

  it('formats millions with M suffix', () => {
    expect(pipe.transform(1_000_000)).toBe('1M');
    expect(pipe.transform(1_500_000)).toBe('1.5M');
    expect(pipe.transform(2_000_000)).toBe('2M');
  });

  it('handles null and undefined', () => {
    expect(pipe.transform(null)).toBe('0');
    expect(pipe.transform(undefined)).toBe('0');
  });
});
