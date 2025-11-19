# Lab 11: Data & Model Versioning with DVC

In this lab, you'll gain hands-on experience with DVC (Data Version Control), a tool for versioning datasets, models, and ML pipelines alongside your code. DVC extends Git to handle large files and creates reproducible ML workflows. By the end of this lab, you'll understand how to track data changes, build ML pipelines, and ensure reproducibility across your team.



## Deliverables

- **Deliverable 1**: Initialize DVC, track a dataset and model with remote storage, and demonstrate switching between versions. Explain to the TA why Git alone is insufficient for ML projects and how DVC solves this problem.

- **Deliverable 2**: Create a multi-stage DVC pipeline  with preprocessing, training, and evaluation stages. Execute the pipeline and show the dependency graph. Explain to the TA how DVC determines which stages need to re-run when you change hyperparameters.

- **Deliverable 3**: Run 3+ experiments with different hyperparameters, compare results, and demonstrate pushing experiments to remote storage. Explain to the TA when you would use DVC versus W&B for experiment tracking, and how they complement each other.

Additionally, mention how DVC could be used for the team project, specifically with the data stream and other design considerations.

## Getting Started

### Prerequisites
- Git installed
- Python 3.10+

### Setup

1. [Clone this repository](https://github.com/kp10-x/mlip-dvc-lab-f25):
```bash
git clone https://github.com/kp10-x/mlip-dvc-lab-f25.git
cd mlip-dvc-lab-f25
```

2. Install dependencies:
```bash
python -m pip install -r requirements.txt
```

For more help, use `dvc <command> --help` or check the [DVC documentation](https://dvc.org/doc).

## Resources

- [DVC Documentation](https://dvc.org/doc)
- [DVC Tutorial](https://dvc.org/doc/start)
- [DVC Pipelines](https://dvc.org/doc/user-guide/pipelines)
- [DVC Experiments](https://dvc.org/doc/user-guide/experiment-management)
