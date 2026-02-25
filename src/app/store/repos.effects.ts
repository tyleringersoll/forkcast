import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { loadRepos, loadReposSuccess, loadReposFailure } from './repos.actions';
import { GithubService } from '../services/github.service';

@Injectable()
export class ReposEffects {
  loadRepos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRepos),
      exhaustMap(({ query }) =>
        this.githubService.getTrendingRepos(query).pipe(
          map((response) => loadReposSuccess({ repos: response.items })),
          catchError((error) =>
            of(
              loadReposFailure({
                error: error?.message ?? 'Failed to load repositories',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private githubService: GithubService
  ) {}
}
