import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch trending repos with default query', () => {
    const mockResponse = { total_count: 1, incomplete_results: false, items: [] };

    service.getTrendingRepos().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((r) => r.url.includes('search/repositories'));
    expect(req.request.params.get('q')).toContain('stars:>10000');
    expect(req.request.params.get('sort')).toBe('stars');
    expect(req.request.params.get('per_page')).toBe('20');
    req.flush(mockResponse);
  });

  it('should include search query in request when provided', () => {
    service.getTrendingRepos('react').subscribe();

    const req = httpMock.expectOne((r) => r.url.includes('search/repositories'));
    expect(req.request.params.get('q')).toContain('react');
    req.flush({ total_count: 0, incomplete_results: false, items: [] });
  });
});
