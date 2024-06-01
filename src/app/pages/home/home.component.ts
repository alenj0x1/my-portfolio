import { Component, afterNextRender } from '@angular/core';
import { GithubService } from '../../services/github.service';
import IGithubUser from '../../interfaces/github/IGithubUser';
import { GITHUB_USER_DEFAULT_DATA } from '../../lib/consts';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { CardProfileComponent } from '../../components/github/card-profile/card-profile.component';

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [CardProfileComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public githubUser: IGithubUser = GITHUB_USER_DEFAULT_DATA
  public loading: boolean = true;

  constructor(
    private servGithub: GithubService,
    private servLocalStorage: LocalStorageService,
    private router: Router
  ) {
    afterNextRender(() => {
      // Check github user in local storage
      const githubUserLocal = this.servLocalStorage.getGithubUser();

      if (!githubUserLocal) {
        // Make request to Github API
        this.servGithub.user().subscribe((user => {
          this.githubUser = user;
          this.servLocalStorage.saveGithubUser(user);

          this.loading = false;
        }), _err => {
          this.router.navigate(['error']);
        })
      }
      else {
        // Set github user in local storage
        this.githubUser = githubUserLocal;

        this.loading = false;
      }
    })
  }
}
