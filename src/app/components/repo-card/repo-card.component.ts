import { Component, input, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitHubRepo } from '../../models/repo.model';
import { FormatStatPipe } from '../../pipes/format-stat.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [CommonModule, FormatStatPipe],
  templateUrl: './repo-card.component.html',
  styleUrl: './repo-card.component.scss',
})
export class RepoCardComponent implements OnInit {
  repo = input.required<GitHubRepo>();

  descriptionDisplay = computed(() => this.repo()?.description ?? 'No description provided.');
  hasLanguage = computed(() => !!this.repo()?.language);

  ngOnInit(): void {
    const obs$ = new Observable<number>((sub) => {
      sub.next(this.repo()?.stargazers_count ?? 0);
      sub.complete();
    });
    obs$.subscribe(() => {});
  }
}
