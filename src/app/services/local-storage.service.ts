import { Injectable } from '@angular/core';
import IGithubUser from '../interfaces/github/IGithubUser';
import IGithubRepository from '../interfaces/github/IGithubRepository';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private reqCooldownUser: number = 60000; // 1m
  private reqCooldownRepos: number = 300000; // 5m
  
  constructor() { }

  // Github - User
  getGithubUser(): null|IGithubUser {
    const data = localStorage.getItem('github_user');

    if (data) {
      // Check cooldown request
      const requestDate = this.getGithubUserRequestDate();
      const dateNow = Date.now();

      if (requestDate && dateNow - requestDate >= this.reqCooldownUser) {
        this.deleteGithubUser()
        return null;
      }

      return JSON.parse(data);
    }

    return null
  }

  getGithubUserRequestDate(): number | null {
    const requestDate = localStorage.getItem('github_user_request_date');
    if (requestDate) return parseInt(requestDate);

    return null;
  }

  saveGithubUser(githubUser: IGithubUser): void {
    localStorage.setItem('github_user', JSON.stringify(githubUser));
    // Set cooldown request
    localStorage.setItem('github_user_request_date', Date.now().toString());
  }

  deleteGithubUser(): void {
    localStorage.removeItem('github_user');
    // Remove cooldown request
    localStorage.removeItem('github_user_request_date');
  }

  // Github - Repos
  getGithubRepos(): null|IGithubRepository[] {
    const data = localStorage.getItem('github_repos');

    if (data) {
      // Check cooldown request
      const requestDate = this.getGithubReposRequestDate();
      const dateNow = Date.now();

      if (requestDate && dateNow - requestDate >= this.reqCooldownRepos) {
        this.deleteGithubRepos()
        return null;
      }

      return JSON.parse(data);
    }

    return null
  }

  getGithubReposRequestDate(): number | null {
    const requestDate = localStorage.getItem('github_repos_request_date');
    if (requestDate) return parseInt(requestDate);

    return null;
  }

  saveGithubRepos(githubRepos: IGithubRepository[]): void {
    localStorage.setItem('github_repos', JSON.stringify(githubRepos));
    // Set cooldown request
    localStorage.setItem('github_repos_request_date', Date.now().toString());
  }

  deleteGithubRepos(): void {
    localStorage.removeItem('github_repos');
    // Remove cooldown request
    localStorage.removeItem('github_repos_request_date');
  }
}
