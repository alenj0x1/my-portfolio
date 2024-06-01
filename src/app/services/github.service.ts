import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IGithubUser from '../interfaces/github/IGithubUser';

interface IApiEndpoints {
  users: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private githubUsername: string = 'alemndev';
  private baseUrl: string = 'https://api.github.com/'
  private apiEndpoints: IApiEndpoints = {
    users: 'users/'
  }

  constructor(private http: HttpClient) { }

  profile() {
    return this.http.get<IGithubUser>(this.baseUrl+this.apiEndpoints.users+this.githubUsername)
  }
}
