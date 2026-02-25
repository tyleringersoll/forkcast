import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { loadRepos, loadReposSuccess, loadReposFailure } from './repos.actions';
import { ReposEffects } from './repos.effects';
import { GithubService } from '../services/github.service';
import { GitHubRepo } from '../models/repo.model';

const mockRepos: GitHubRepo[] = [
  {
    id: 1,
    name: 'test',
    full_name: 'owner/test',
    description: 'Desc',
    html_url: 'https://github.com/owner/test',
    stargazers_count: 50000,
    language: 'TypeScript',
    owner: {
      login: 'owner',
      avatar_url: 'https://avatar',
      html_url: 'https://github.com/owner',
    },
  },
];

describe('ReposEffects', () => {
  let actions$: Observable<Action>;
  let effects: ReposEffects;
  let httpMock: HttpTestingController;
  let githubService: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ReposEffects,
        GithubService,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(ReposEffects);
    httpMock = TestBed.inject(HttpTestingController);
    githubService = TestBed.inject(GithubService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should dispatch loadReposSuccess when API returns data', (done) => {
    actions$ = of(loadRepos({}));

    effects.loadRepos$.subscribe((action) => {
      expect(action).toEqual(loadReposSuccess({ repos: mockRepos }));
      done();
    });

    const req = httpMock.expectOne(
      (r): boolean => !!(
        r.url.includes('search/repositories') &&
        r.params.get('q')?.includes('stars:>10000')
      )
    );
    expect(req.request.method).toBe('GET');
    req.flush({ total_count: 1, incomplete_results: false, items: mockRepos });
  });

  it('should dispatch loadReposFailure when API fails', (done) => {
    actions$ = of(loadRepos({}));

    effects.loadRepos$.subscribe((action) => {
      expect(action.type).toBe(loadReposFailure.type);
      expect((action as ReturnType<typeof loadReposFailure>).error).toBeDefined();
      done();
    });

    const req = httpMock.expectOne(
      (r): boolean => r.url.includes('search/repositories')
    );
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should include query in request when loadRepos has query', (done) => {
    actions$ = of(loadRepos({ query: 'react' }));

    effects.loadRepos$.subscribe(() => done());

    const req = httpMock.expectOne((r): boolean => r.url.includes('search/repositories'));
    expect(req.request.params.get('q')).toContain('react');
    req.flush({ total_count: 0, incomplete_results: false, items: [] });
  });
});
