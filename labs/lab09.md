# Lab 9 : Data & Pipeline Versioning — DVC and Roar

In this lab you will run the same ML pipeline through two tools that take fundamentally different approaches to pipeline tracking and reproducibility:

- **DVC (Data Version Control)** — a *declarative* tool where you explicitly define your pipeline stages, dependencies, and outputs in a YAML file. You tell DVC what your pipeline looks like.
- **Roar (Run Observation & Artifact Registration)** — an *implicit* tool that observes file I/O as your code runs and automatically infers the dependency graph. You just run your code; Roar figures out the pipeline.

By using both on the same pipeline, you will understand not just how each tool works, but *why* these different design philosophies exist and when each is appropriate.


## Learning Objectives

1. Version datasets and models using DVC alongside Git
2. Build declarative, reproducible ML pipelines with `dvc.yaml`
3. Run and compare experiments with DVC's experiment tracking
4. Use Roar to implicitly track pipeline lineage without configuration files
5. Inspect and interpret auto-inferred lineage DAGs
6. Articulate when to use declarative (DVC) vs. observational (Roar) pipeline tracking

## Deliverables

- **Deliverable 1 (Setup)**: A working ML pipeline that runs end-to-end. Show the TA your completed `train.py`, `evaluate.py`, and `params.yaml`, and demonstrate a successful manual run.

- **Deliverable 2 (DVC)**: A DVC-managed pipeline with remote storage, a `dvc.yaml` defining three stages, and at least 3 experiments. Show the TA the dependency graph (`dvc dag`), demonstrate that changing a hyperparameter only re-runs affected stages, and explain why Git alone is insufficient for ML projects.

- **Deliverable 3 (Roar)**: A Roar-tracked pipeline run with an auto-inferred DAG. Show the TA the `roar dag` output, demonstrate how the lineage updates after a change, and show the registered artifact on GLaaS. Explain how Roar inferred the dependencies without any configuration file.

- **Deliverable 4 (Comparison)**: Written answers to the reflection questions in Part 3. Explain to the TA when you would choose DVC vs. Roar, and whether they could complement each other.

## How to Use This Repo

| File | What it contains |
|------|-----------------|
| **This README** | Overview, setup, and summary |
| [**INSTRUCTIONS.md**](INSTRUCTIONS.md) | Step-by-step lab tasks (Parts 1–3) |
| [**TROUBLESHOOTING.md**](TROUBLESHOOTING.md) | Common errors and how to fix them |

---

## Setup

### Prerequisites

- Git installed
- Python 3.10+ (installed via Homebrew, pyenv, or a standard installer — **not** the macOS system Python at `/usr/bin/python3`)
- A terminal environment (see platform notes below)

> **Platform notes**:
> - **macOS**: Both DVC and Roar work natively. Roar requires a non-Apple Python (Homebrew, pyenv, conda, or python.org installer). Run `which python3` — if it shows `/usr/bin/python3`, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md).
> - **Windows**: DVC works natively. Roar requires **WSL2** (Windows Subsystem for Linux). Install it with `wsl --install` in PowerShell if you don't have it, then do the entire lab inside WSL.
> - **Linux**: Everything works out of the box.

### Installation

1. Clone this repository:

```bash
git clone https://github.com/AshrithaG/mlip-lab-9.git
cd mlip-lab-9
```

2. Create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Verify Roar installed correctly:

```bash
roar --version
```

### Explore the Repository

```
mlip-lab-9/
├── data/raw/data.csv          # Breast Cancer Wisconsin dataset (569 samples, 30 features)
├── scripts/
│   ├── preprocess.py          # Train/test split (complete — use as reference)
│   ├── train.py               # Random forest training (has TODOs)
│   ├── evaluate.py            # Model evaluation (has TODOs)
│   └── augment_data.py        # Adds synthetic rows to the dataset
├── params.yaml                # Hyperparameters (has TODOs)
├── dvc.yaml.template          # Template for your DVC pipeline
└── requirements.txt
```

### Complete the Pipeline Code

Before using any versioning tools, you need a working pipeline. There are TODOs in three files — look at `preprocess.py` for reference, since it's already complete.

**1. Fill in `params.yaml`** — the `train` section needs hyperparameters. Check what `scripts/train.py` expects to read.

**2. Complete `scripts/train.py`** — look at how `preprocess.py` loads its parameters from `params.yaml`. Apply the same pattern here, and set the path to the processed training data.

**3. Complete `scripts/evaluate.py`** — the sklearn metric functions are already imported. Use them with `y_test` and `y_pred`, then populate the `metrics` dictionary.

**4. Verify the pipeline runs end-to-end**:

```bash
python3 scripts/preprocess.py
python3 scripts/train.py
python3 scripts/evaluate.py
```

You should see output showing the data split, trained model parameters, and evaluation metrics. Fix any errors before proceeding.

> **Checkpoint (Deliverable 1)**: Show the TA your completed code and a successful pipeline run.

---

**Next step**: Open [INSTRUCTIONS.md](INSTRUCTIONS.md) to begin Part 1 (DVC).

---

## Summary

| | DVC | Roar |
|---|---|---|
| **Philosophy** | Declarative — you define the pipeline | Observational — the tool infers the pipeline |
| **Config required** | `dvc.yaml`, `params.yaml`, remote setup | `roar init` only |
| **DAG** | Defined by you, enforced by DVC | Inferred from file I/O |
| **Re-runs** | `dvc repro` skips unchanged stages automatically | You decide what to re-run; Roar records what happened |
| **Versioning** | Content-addressed storage with pointer files in Git | Content hashes in local DB + GLaaS |
| **Reproducibility** | `dvc.lock` + `dvc repro` | `roar reproduce <hash>` |
| **Collaboration** | Pipeline spec lives in Git | Lineage lives in GLaaS |
| **Platform** | All platforms | Linux, macOS (experimental), Windows via WSL |


## Resources

- [DVC Documentation](https://dvc.org/doc)
- [DVC Pipelines Guide](https://dvc.org/doc/user-guide/pipelines)
- [DVC Experiments Guide](https://dvc.org/doc/user-guide/experiment-management)
- [Roar on PyPI](https://pypi.org/project/roar-cli/)
- [GLaaS — Global Lineage as a Service](https://glaas.ai/)
