import { Component, Input } from '@angular/core';
import IGithubUser from '../../../interfaces/github/IGithubUser';
import { GITHUB_USER_DEFAULT_DATA } from '../../../lib/consts';
import { ParseUsernamePipe } from '../../../pipes/parse-username.pipe';

@Component({
  selector: 'github-card-profile',
  standalone: true,
  imports: [ParseUsernamePipe],
  templateUrl: './card-profile.component.html',
  styleUrl: './card-profile.component.css'
})
export class CardProfileComponent {
  @Input({ required: true })
  public githubUser: IGithubUser = GITHUB_USER_DEFAULT_DATA;
}
