import IGithubRepository from "../interfaces/github/IGithubRepository";

export default function githubReposParser(repos: IGithubRepository[]) {
  repos.forEach(repo => {
    repo.additionals.languages.forEach((lang, index, languagesArray) => {
      if (lang === 'C#') languagesArray[index] = 'csharp';
      if (lang === 'TypeScript') languagesArray[index] = 'typescript';
      if (lang === 'JavaScript') languagesArray[index] = 'javascript';
      if (lang === 'HTML') languagesArray[index] = 'html';
      if (lang === 'CSS') languagesArray[index] = 'css';
      if (lang === 'Pug') languagesArray[index] = 'pug';
      if (lang === 'SCSS') languagesArray[index] = 'sass';
      if (lang === 'TSQL') languagesArray[index] = 'tsql';
    });
  });

  return repos;
}
