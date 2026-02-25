import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReposState } from './repos.reducer';

export const selectReposState = createFeatureSelector<ReposState>('repos');

export const selectRepos = createSelector(
  selectReposState,
  (state: ReposState) => state.repos
);

export const selectLoading = createSelector(
  selectReposState,
  (state: ReposState) => state.loading
);

export const selectError = createSelector(
  selectReposState,
  (state: ReposState) => state.error
);
