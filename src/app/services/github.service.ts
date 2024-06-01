import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IGithubUser from '../interfaces/github/IGithubUser';
import IGithubRepository from '../interfaces/github/IGithubRepository';
import { forkJoin, mergeMap, switchMap } from 'rxjs';

interface IApiEndpoints {
  users: string;
  repos: string[];
  languages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private githubUsername: string = 'alemndev';
  private baseUrl: string = 'https://api.github.com/'
  private apiEndpoints: IApiEndpoints = {
    users: 'users/',
    repos: ['users/', '/repos'],
    languages: ['repos/', '/languages']
  }

  constructor(private http: HttpClient) { }

  user() {
    return this.http.get<IGithubUser>(this.baseUrl + this.apiEndpoints.users + this.githubUsername);
  }

  repos() {
    return this.http.get<IGithubRepository[]>(this.baseUrl + this.apiEndpoints.repos[0] + this.githubUsername + this.apiEndpoints.repos[1])
      .pipe(
        switchMap(repos =>
          forkJoin(
            repos.map(repo =>
              this.http.get<Object>(this.baseUrl + this.apiEndpoints.languages[0] + this.githubUsername +'/' +repo.name + this.apiEndpoints.languages[1])
                .pipe(
                  mergeMap((languages) => {
                    repo.additionals = {
                      languages: Object.keys(languages)
                    };
                    
                    return [repo];
                  })
                )
            )
          )
        )
      );
  }
}
