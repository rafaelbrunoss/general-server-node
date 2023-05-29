# GIT

Working with software doesn't just involve writing code, but an important part is versioning that code by putting specific and concise messages. To achieve this goal, a commonly adopted practice is the use of semantic commits.[^1] [^2]

`type(optional scope): action verb + message`

### Commit types

- **feature**: new feature in the code
- **fix**: bug fix
- **docs**: documentation change
- **style**: code formatting
- **refactor**: code refactoring
- **test**: addition or modification of tests
- **build**: change related to settings, tools, dependencies, etc.
- **revert**: revert commits

**Commit examples**

```bash
git commit -m "fix: fix the function onChange on the user name field"
```

```bash
git commit -m "feature(user/profile): add the Avatar component"
```

```bash
git commit -m "build(npm): update react from 18.1.0 to 18.2.0"
```

### Procedures

- Commit small tasks. **Don't** do a `git add .` of multiple files.
- Use semantic commits. Commits outside this rule will automatically fail.
- Write specific and concise messages in commits. Always start with a verb in the infinitive.
- Use the [GitLab Flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html):
  - When starting a new task, create a new branch based on the most current version of the development branch. When you finish the task, make a pull request from this new branch to the development one. When everything is done, delete your branch from the repository.
  - When fixing a staging bug, a bugfix branch should be created based on the most current staging version branch. When you're done with the fix, make a pull request from that branch for staging and for development. When everything is done, delete your branch from the repository.
  - When fixing a bug in production, a hotfix branch should be created based on the most current version of the production branch. When you're done fixing, make a pull request from that branch to production and staging. From staging make a new pull request to development. When everything is done, delete your branch from the repository.

![alt text][gitlab-flow]

### Documentation

[Using git in the right way (Best Practices)](https://www.youtube.com/watch?v=6OokP-NE49k)
[Pro Git book](https://git-scm.com/book/en/v2)
[Git Cheatsheet](https://training.github.com/downloads/pt_BR/github-git-cheat-sheet/)
[Git Cheatsheet (visual)](https://ndpsoftware.com/git-cheatsheet.html#loc=index;)
[Command list](https://git-scm.com/docs)

---

[Home](../README.md)

[^1]: https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
[^2]: https://www.conventionalcommits.org/en/v1.0.0/

[gitlab-flow]: ./images/gitlab-flow.png 'GitLab Flow'
