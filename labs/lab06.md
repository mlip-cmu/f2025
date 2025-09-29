# Lab 6: Continuous Integration with GitHub Actions

In this lab, you will set up Continuous Integration (CI) using GitHub Actions.  
You will practice enforcing test coverage thresholds, running a simple ML demo pipeline in CI, and switching from GitHub-hosted to self-hosted runners.  
By the end, you should understand how CI helps maintain code quality, automate ML workflows, and integrate with custom infrastructure.

## Deliverables

- [ ] **Deliverable 1:** Create a pull request that demonstrates one failing check (coverage below threshold) and one passing check (coverage above threshold). Show the TA the PR view with red and green checks, and point out in the logs how coverage caused the pass/fail. Explain to the TA why enforcing a coverage threshold in CI is useful and what kind of issues it helps catch early.

- [ ] **Deliverable 2:** Configure the workflow to run on your self-hosted runner. Trigger a workflow run and show in the logs that the runner label is `self-hosted`. Explain to the TA the difference between a GitHub-hosted runner and a self-hosted runner, and why you might prefer one over the other.

- [ ] **Deliverable 3:** Run the ML demo pipeline as part of CI and show the TA the logs where the model score is printed. Explain to the TA why integrating the ML demo pipeline into CI adds value compared to only running it manually on your local machine.


## Step 0: Repository Setup

### Create Your Repository

1. Start from the [Lab 6 Template Repository](link-to-template)
2. Click **Use this template** at the top
3. Name your repository: `lab6-actions-<your-first-name>`
4. **Important:** Set visibility to **Private**

> Private repos ensure your workflows, credentials, and logs remain restricted when using self-hosted runners.

### Local Setup

```bash
git clone https://github.com/<your-username>/lab6-actions-<your-first-name>.git
cd lab6-actions-<your-first-name>
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### Verify Local Tests

```bash
python -m pytest -q --cov=prediction_pipeline_demo --cov-report=term-missing
```

Examine the output to understand which lines are executed and which are missing coverage.

**Key files to explore:**
- `prediction_pipeline_demo.py`
- `tests/` folder
- `.github/workflows/ci.yml`


## Step 1: GitHub Actions CI Setup

The repository includes `.github/workflows/ci.yml` which:

- Checks out code
- Sets up Python
- Installs dependencies
- Runs tests with coverage

**Default coverage threshold:** `--cov-fail-under=50`

- Coverage ≥ 50% → the GitHub Actions workflow job will succeed (CI passes).
- Coverage < 50% → the GitHub Actions workflow job will fail (CI fails).

Check missing lines in the "Run tests with coverage" step logs.


## Step 2: Experiment with Coverage Thresholds

### Red PR (Failing)

1. Edit `.github/workflows/ci.yml` and raise the threshold to 70 %
2. Commit on a new branch and open a PR

You should observe that GitHub Actions workflow job will fail because TODO tests are incomplete and the tests do not cover atleast 70 % of the lines in `prediction_pipeline_demo.py`

### Green PR (Passing)

1. Complete the two TODOs in `tests/test_prediction_pipeline_demo.py`
2. Push changes to the same PR
3. GitHub Actions workflow job/CI will pass once coverage ≥ 70%
4. Merge the PR to main

**Tip:** Always test locally before pushing:
```bash
python -m pytest -q --cov=prediction_pipeline_demo --cov-report=term-missing
```

This demonstrates how CI coverage thresholds enforce quality gates.


## Step 3: Add ML Pipeline Step to the current Github Actions Workflow

1. In `.github/workflows/ci.yml`, read the TODO comment and make the necessary modifications.
2. Commit these changes to a different branch and raise a PR.
3. Merge the PR to main

This runs the ML pipeline in CI. Since `Housing.csv` is included, you'll see output like:

```
Trained model score is: 0.82
```

## Step 4: Self-Hosted Runner

Run CI on your own machine instead of GitHub's servers.

### Setup

1. Go to: **Settings → Actions → Runners → New self-hosted runner**
2. Follow the provided commands:
   - Download runner
   - Configure with token: `./config.sh ...` (press Enter to accept defaults)
   - Start: `./run.sh`

### Update Workflow

1. In `.github/workflows/ci.yml`, the workflow is still pointing to the default GitHub-hosted environment. For this lab, the goal is to run the pipeline on the self-hosted runner you set up earlier. Update the configuration so that the job no longer runs on ubuntu-latest but instead targets the self-hosted machine.

2. Next, replace the "Set up Python" step with:
```yaml
- name: Show Python
  run: python3 --version
```

**Note:** Ensure Python 3.11 or 3.12 is installed on your self-hosted runner machine.

Push to your branch to trigger CI. Check Actions logs to verify jobs run on your machine.


## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Pytest Coverage](https://pytest-cov.readthedocs.io/)
- [Managing Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)


## Troubleshooting

**Coverage too low:**
```bash
pytest --cov=prediction_pipeline_demo --cov-report=term-missing
```
Check which lines are missing.

**Runner idle:**
- Ensure self-hosted runner is running (`./run.sh`)
- Verify `runs-on` matches runner labels

**Python errors:**
- Install Python 3.11 or 3.12 on your self-hosted machine