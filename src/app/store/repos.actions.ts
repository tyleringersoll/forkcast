import { createAction, props } from '@ngrx/store';
import { GitHubRepo } from '../models/repo.model';

export const loadRepos = createAction('[Repos] Load Repos', props<{ query?: string }>());
export const loadReposSuccess = createAction(
  '[Repos] Load Repos Success',
  props<{ repos: GitHubRepo[] }>()
);
export const loadReposFailure = createAction(
  '[Repos] Load Repos Failure',
  props<{ error: string }>()
);
