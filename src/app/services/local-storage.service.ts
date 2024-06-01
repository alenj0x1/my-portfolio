import { Injectable } from '@angular/core';
import IGithubUser from '../interfaces/github/IGithubUser';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  // Github
  getGithubUser(): null|IGithubUser {
    const data = localStorage.getItem('github_user');

    if (data) {
      // Check cooldown request
      const requestDate = this.getGithubUserRequestDate();
      const dateNow = Date.now();
      const requestCooldown = 60000; // 1m

      if (requestDate && dateNow - requestDate >= requestCooldown) {
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
}
