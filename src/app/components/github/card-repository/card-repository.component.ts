import { Component, Input } from '@angular/core';
import IGithubRepository from '../../../interfaces/github/IGithubRepository';
import { GITHUB_USER_REPOSITORY_DEFAULT_DATA } from '../../../lib/consts';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'github-card-repository',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './card-repository.component.html',
  styleUrl: './card-repository.component.css'
})
export class CardRepositoryComponent {
  @Input({ required: true })
  public githubRepo: IGithubRepository = GITHUB_USER_REPOSITORY_DEFAULT_DATA
}
