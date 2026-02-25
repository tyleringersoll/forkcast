import { createReducer, on } from '@ngrx/store';
import { toggleTheme } from './theme.actions';

export type ThemeState = 'light' | 'dark';

const initialState: ThemeState = 'light';

export const themeReducer = createReducer<ThemeState>(
  initialState,
  on(toggleTheme, (state): ThemeState => (state === 'light' ? 'dark' : 'light'))
);
