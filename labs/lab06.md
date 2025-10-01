# Lab 6: Continuous Integration with GitHub Actions

In this lab, you will set up Continuous Integration (CI) using GitHub Actions.  
You will practice enforcing test coverage thresholds, running a simple ML demo pipeline in CI, and switching from GitHub-hosted to self-hosted runners.  
By the end, you should understand how CI helps maintain code quality, automate ML workflows, and integrate with custom infrastructure.

## Deliverables

- [ ] **Deliverable 1:** Create a pull request that demonstrates one failing check (coverage below threshold) and one passing check (coverage above threshold). Show the TA the PR view with red and green checks, and point out in the logs how coverage caused the pass/fail. Explain to the TA when or whether enforcing coverage is useful.

- [ ] **Deliverable 2:** Configure the workflow to run on your self-hosted runner. Trigger a workflow run and show in the logs that the runner label is `self-hosted`. Explain to the TA the difference between a GitHub-hosted runner and a self-hosted runner, and why you might prefer one over the other.

- [ ] **Deliverable 3:** Run the ML demo pipeline as part of CI and show the TA the logs where the model score is printed. Explain to the TA why integrating the ML demo pipeline into CI adds value compared to only running it manually on your local machine.


## Step 0: Repository Setup

### Create Your Repository

1. Start from the [Lab 6 Template Repository](https://github.com/BhuvanashreeM/lab6-github-actions-template)
2. Click **Use this template** at the top
3. Name your repository: `lab6-actions-<your-first-name>`
4. **Important:** Set visibility to **Private**

> Note: Keeping the repository private is especially important when using self-hosted runners (which you will set up in Step 4), since workflow logs and any credentials used during execution could otherwise be exposed publicly. A private repo ensures this information remains restricted to you and your collaborators.

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

Open `.github/workflows/ci.yml` and familiarise yourself with the important terms and layout of a GitHub Actions workflow (jobs, steps, runs-on, etc.). Pay attention to the step “Run tests with coverage”.

Reproduce the command from the “Run tests with coverage” step once on your local machine. The current configuration uses a default coverage threshold of 50%:

Understand converage:
**Default coverage threshold:** `--cov-fail-under=50`
- Coverage ≥ 50% → the GitHub Actions workflow job will succeed (CI passes).
- Coverage < 50% → the GitHub Actions workflow job will fail (CI fails).

## Step 2: Experiment with Coverage Thresholds

In Step 1, you learned what the coverage threshold means (default: 50%) when running tests locally. Now raise the threshold in the GitHub Actions workflow to **70%** and open a pull request to see how CI enforces it.

Expect the workflow to fail initially because current tests likely don’t reach 70% coverage. Your task is to determine and implement the changes needed to make it pass. This will typically require adding or completing tests to cover untested branches in `prediction_pipeline_demo.py`

Push your updates to the same PR and observe CI turning green once coverage meets or exceeds 70%.

## Step 3: Add ML Pipeline Step to the current Github Actions Workflow

So far, you’ve seen how the workflow runs tests with coverage as one of the steps in the CI pipeline. Now you’ll try adding a new step.

Check  `.github/workflows/ci.yml` and complete the section marked for adding a step for running the demo pipeline end-to-end, so that CI executes `prediction_pipeline_demo.py` and logs the model’s R² score.

> Note: For your course project, we don’t expect you to run full training pipelines inside CI. In practice, GitHub Actions steps are best used for lightweight checks, tests, and validations. Here, the demo pipeline is included only as an exercise to illustrate how a command can be executed within a workflow.

## Step 4: Self-Hosted Runner

Until now, all workflows have been executed on GitHub-hosted servers. In this step, you will configure CI to run on your own machine using a self-hosted runner.

### Setup

1. Go to: **Settings → Actions → Runners → New self-hosted runner**
2. Follow the provided commands:
   - Download runner
   - Configure with token: `./config.sh ...` (press Enter to accept defaults)
   - Start: `./run.sh`

### Update Workflow

1. Update the workflow so the job runs on your self-hosted runner.

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