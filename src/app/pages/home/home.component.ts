import { Component, afterNextRender } from '@angular/core';
import { GithubService } from '../../services/github.service';
import IGithubUser from '../../interfaces/github/IGithubUser';
import { GITHUB_USER_DEFAULT_DATA } from '../../lib/consts';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public githubUser: IGithubUser = GITHUB_USER_DEFAULT_DATA;
  public loading: boolean = true;
}
