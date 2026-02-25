import { selectRepos, selectLoading, selectError } from './repos.selectors';
import { ReposState } from './repos.reducer';

describe('reposSelectors', () => {
  const createState = (overrides: Partial<ReposState> = {}): { repos: ReposState } => ({
    repos: {
      repos: [],
      loading: false,
      error: null,
      ...overrides,
    },
  });

  it('selectRepos should return repos', () => {
    const repos = [
      {
        id: 1,
        name: 'r',
        full_name: 'o/r',
        description: null,
        html_url: 'https://github.com/o/r',
        stargazers_count: 100,
        language: 'TS',
        owner: { login: 'o', avatar_url: '', html_url: '' },
      },
    ];
    const reposState = createState({ repos }).repos;
    expect(selectRepos.projector(reposState)).toEqual(repos);
  });

  it('selectLoading should return loading', () => {
    expect(selectLoading.projector(createState().repos)).toBe(false);
    expect(selectLoading.projector(createState({ loading: true }).repos)).toBe(true);
  });

  it('selectError should return error', () => {
    expect(selectError.projector(createState().repos)).toBeNull();
    const err = 'Something failed';
    expect(selectError.projector(createState({ error: err }).repos)).toBe(err);
  });
});
