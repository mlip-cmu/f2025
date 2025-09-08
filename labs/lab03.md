# Lab 3: Git

## Prerequisites
- Github account
- Git installed on your local machine
  - Please use github cli or git directly


## Deliverables:

- [ ] Create and fix a merge conflict locally. Then, amend the merge commit to state that a merge conflict was resolved.
- [ ] Raise a pull request with your new changes. Show the the url of the pull request to a TA.
- [ ] Demonstrate a safe rollback using `git revert` of a commit you intentionally add during the lab, and explain when `revert` is preferred over `reset`.
- [ ] Be ablt to explain the difference between a cloned and forked repository, when you would use each, and why we use pull requests.

It is recommended that you use a git extension for your IDE to complete this lab. If you are using Visual Studio Code, you can use the [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) extension.

## Setup
1. **Clone** this PyTorch repository to your local machine - [Michelle-Wang0/pytorch_copy](https://github.com/Michelle-Wang0/pytorch_copy) - by running the following command in your terminal:

```
git clone https://github.com/Michelle-Wang0/pytorch_copy.git  # Feel free to use the SSH URL instead if you prefer
cd pytorch-copy
```

2. Open the repository in an IDE.


## Exercise 1: Create and Fix a merge conflict. Then amend the merge commit.

1. Create a new branch called `merge-conflict` from `main` branch.
2. Make a change in one of the **allowed files**, and commit with a meaningful message. Pick **one** of the following to manufacture a conflict (you may choose another file if you observe it’s suitable):
- `torch/nn/functional.py` — around the `interpolate` function  
- `README.md` — add a short note in the same paragraph on two different branches to force a conflict
> **Example you may use (optional hint, not required):** Open the `torch/nn/functional.py` file, navigate to the `interpolate` function (line 4483) and change the resizing mode from `nearest` to `bilinear`
> You may also **freely design** your own conflicting edits as long as they occur in one of the files above.
3. Switch back to `main`, make a **conflicting** change to the **same section** you used above in 2., and commit.  
> **Example you may use (optional hint, not required):** Open the `torch/nn/functional.py` file, navigate to the `interpolate`(line 4483) function and change the resizing mode from `nearest` to `bicubic` and `align_corners` to `True`
4. Merge the feature branch into `main` and resolve the conflict.  
   - Keep a coherent final version (your choice, but be able to justify it to the TA).  
5. Complete the merge commit, then **amend that merge commit message** to explicitly mention that a conflict was resolved.
6. Optional: Use `git log --oneline --graph --decorate` and/or `git show` to **visualize** and be prepared to explain what happened.


## Exercise 2: Create a pull request to the original repository

1. Create a new branch (e.g., `pull-request`) from `main`. Make a small, reviewable change (e.g., a comment or README line) and commit.  
2. **Attempt to push** this branch to the current `origin`. **Let it fail** if you don’t have write access. 
   - Try running the following command - `git remote -v` - to debug the issue (We expect you to understand the usage and output of this commmand)
3. On GitHub, **fork** [Michelle-Wang0/pytorch_copy](https://github.com/Michelle-Wang0/pytorch_copy) to your own account. (You had only cloned it earlier)
4. Update your local repo’s remotes so that:
   - `origin` points to **your fork**,
   - `upstream` points to the **original** repository.
   > You’ll need to figure out how to add/update remotes. Show the commands you chose and the result to the TA.
5. Push your branch to your fork and open a **pull request** from your branch into `upstream/main` (the original repo, main branch from [Michelle-Wang0/pytorch_copy](https://github.com/Michelle-Wang0/pytorch_copy)).  
6. Save the PR URL to show the TA.

## Exercise C — Safe rollback with `git revert`
1. On a new commit (can be on your pull request branch), and create a small intentional mistake (e.g., a typo or debug print) and **commit** it.  
2. Perform a **rollback using `git revert <bad-commit-hash>`** to create a new commit that undoes the change while preserving history.  
3. Show the log and point out the revert commit.  
4. Think about the question: when `revert` is preferred over `reset`? (e.g., on shared branches / after publishing history)


## Useful commands

- `git checkout -b <branch-name>` - creates a new branch and switches to it
- `git checkout <branch-name>` - switches to the specified branch
- `git merge <branch-name>` - merges the specified branch into the current branch
- `git status` - shows the status of the current branch
- `git add <file-name>` - adds the specified file to the staging area
- `git commit -m "<commit-message>"` - commits the staged changes with the specified commit message
- `git log` - shows the commit history
- `git log --oneline` - shows the commit history with each commit on a single line
- `git log --oneline --graph` - shows the commit history with each commit on a single line and the branches graph
- `git push origin <branch-name>` - pushes the specified branch to the remote repository
- `git pull origin <branch-name>` - pulls the specified branch from the remote repository
- `git branch -d <branch-name>` - deletes the specified branch
- `git commit --amend` - amends the last commit
- `git push origin --delete <branch-name>` - deletes the specified branch from the remote repository


## Resources
- [Simple Git Command Visualizations](https://learngitbranching.js.org/)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Git Documentation](https://git-scm.com/doc)
- [Git Exercises](https://gitexercises.fracz.com/)
