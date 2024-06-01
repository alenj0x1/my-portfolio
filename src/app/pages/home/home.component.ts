import { Component, afterNextRender } from '@angular/core';
import { GithubService } from '../../services/github.service';
import IGithubUser from '../../interfaces/github/IGithubUser';
import { GITHUB_USER_DEFAULT_DATA } from '../../lib/consts';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { CardProfileComponent } from '../../components/github/card-profile/card-profile.component';
import IGithubRepository from '../../interfaces/github/IGithubRepository';
import { CardRepositoryComponent } from '../../components/github/card-repository/card-repository.component';
import githubReposParser from '../../lib/parser';

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [CardProfileComponent, CardRepositoryComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public githubUser: IGithubUser = GITHUB_USER_DEFAULT_DATA;
  public githubRepos: IGithubRepository[] = [];
  public loading: boolean = true;

  constructor(
    private servGithub: GithubService,
    private servLocalStorage: LocalStorageService,
    private router: Router
  ) {
    let requestsPending = 2;

    const checkLoading = () => {
      requestsPending--;
      if (requestsPending === 0) this.loading = false;
    }

    afterNextRender(async () => {
      // User
      // Check github user in local storage
      const githubUserLocal = this.servLocalStorage.getGithubUser();

      if (!githubUserLocal) {
        // Make request to Github API
        this.servGithub.user().subscribe((user => {
          this.githubUser = user;
          this.servLocalStorage.saveGithubUser(user);
        }), _err => {
          this.router.navigate(['error']);
        }, () => {
          checkLoading()
        })
      }
      else {
        // Set github user in local storage
        this.githubUser = githubUserLocal;
        checkLoading()
      }
      // ----------------------------------------------------------
      
      // Repos
      // Check github repos in local storage
      const githubReposLocal = this.servLocalStorage.getGithubRepos();
      
      if (!githubReposLocal) {
        // Make request to Github API
        this.servGithub.repos().subscribe((repos) => {
          this.githubRepos = repos;

          this.servLocalStorage.saveGithubRepos(githubReposParser(repos));
        }, _err => {
          this.router.navigate(['error']);
        }, () => {
          checkLoading()
        })
      }
      else {
        // Set github repos in local storage
        this.githubRepos = githubReposLocal;
        checkLoading()
      }
      // -----------------------------------------------------------
    })
  }
}
