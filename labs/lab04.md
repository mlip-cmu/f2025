# cmu-mlip-model-testing-lab

# Lab 4: Model Testing with Weights & Biases and LLMs

In this lab, you'll gain hands-on experience using **Weights & Biases (W&B)** for interactive model evaluation, and **LLMs** for generating targeted test cases.

- **W&B** is an end-to-end MLOps platform that helps track experiments, visualize metrics, log datasets and predictions, and slice your data using filters and custom metadata. It integrates seamlessly with libraries like PyTorch, TensorFlow, Hugging Face, and more.
- **LLMs** (Large Language Models) can be used to generate synthetic test cases—especially useful for probing model robustness and uncovering failure modes.

To receive credit for this lab, show your completed notebook and filtered tables to the TA during recitation.


## Deliverables

Your goal in this lab is to simulate how ML engineers evaluate model behavior in production settings—by logging model predictions, slicing data to find failure patterns, and generating test cases to stress-test model performance.

To receive credit, walk your TA through the following:

- [ ] **Set up and log your run to W&B**, create 2 slices with filters, and generate bar chart visualizations of accuracy.  
- [ ] **Analyze your slices and their accuracies**, explain the insights you gained, and answer: *Why can accuracy be misleading, and why is slicing useful?*  
- [ ] **Create 3 additional slices and generate 10 synthetic test cases** using an LLM for one new slice.

Hints: For the slices you create, you should be able to justify why you want to create them and demonstrate what you observed for each.


## Getting started
- Clone the starter code from this [Git repository](https://github.com/nikitachaudharicodes/cmu-mlip-model-testing-lab).
- The repository includes a python notebook which contains the starter code.

## Installation instructions
- Recommended: Python 3.10+ (but W&B works with Python >= 3.7)
- Install dependencies:

  ```bash
  pip install --upgrade wandb datasets transformers tqdm emoji
- Login to W&B

    1. Create a free account at [https://wandb.ai](https://wandb.ai) using your CMU email  
    2. Find your API key here: [https://wandb.ai/authorize](https://wandb.ai/authorize)
    3. Run the following command in your terminal:

    ```bash
    wandb login

## Code related details
- Finish all 8 steps mentioned in the python notebook
- If you have trouble downloading the datasets and/or running model inference, use `tweets.csv` shared in the folder
- If you have trouble using the GPTs provided, use plain ChatGPT for test case generation
