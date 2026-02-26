import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitHubSearchResponse } from '../models/repo.model';

const GITHUB_API = 'https://api.github.com/search/repositories';

@Injectable({ providedIn: 'root' })
export class GithubService {
  constructor(private http: HttpClient) {}

  getTrendingRepos(query?: string): Observable<GitHubSearchResponse> {
    const q = query?.trim()
      ? `stars:>10000 ${query}`
      : 'stars:>10000';
    const params = {
      q,
      sort: 'stars',
      order: 'desc',
      per_page: '20',
    };
    return this.http.get<GitHubSearchResponse>(GITHUB_API, { params });
  }
}
