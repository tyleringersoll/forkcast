import { themeReducer } from './theme.reducer';
import { toggleTheme } from './theme.actions';

describe('themeReducer', () => {
  it('should return same state for unknown action', () => {
    const action = { type: 'UNKNOWN' } as never;
    expect(themeReducer('light', action)).toBe('light');
    expect(themeReducer('dark', action)).toBe('dark');
  });

  it('should toggle from light to dark', () => {
    expect(themeReducer('light', toggleTheme())).toBe('dark');
  });

  it('should toggle from dark to light', () => {
    expect(themeReducer('dark', toggleTheme())).toBe('light');
  });
});
