# Lab 10: Explainability with Alibi & SHAP
In this lab, you'll learn about the Alibi Explain and SHAP libraries, and implement both global and local explanations of tabular and image classification models.
Alibi Explain is an open-source Python library for machine learning model inspection and interpretation. It provides high-quality implementations of black-box, white-box, local, and global explanation methods for classification and regression models.
SHAP (SHapley Additive exPlanations) is based on game theory and helps quantify the contribution of each feature to a model’s prediction, offering both global and instance-level interpretability.
Complete all the Deliverables mentioned below and show them to a TA for credit.

## Notebook structure
- Section 1: Data and Model Setup
- Section 2: Explainability with Alibi
- Section 3: Anchor Explanations (Run Only)
- Section 4: SHAP Comparison
- Section 5: Reflection and Discussion


## Deliverables
- Finish all the TODOs in Section 2 of the notebook
- Generate Partial Dependence (PD) Plots and discuss your findings with the TA. Answer:
     - Q1: Which features have higher importance in the prediction? (Section 2.1)
     - Q2: What can you conclude with the PD plots? (Section 2.2)
     - Q3: Discuss with the TA the results (heatmaps). (Section 2.2)
- Run and explore Anchor explanations on image data. Show your final results and discuss the parameters and findings with the TA. (Section 2.3)
- Complete the SHAP Comparison section:
     - Q4: Which features have the strongest SHAP impact, and do they match the PD findings?s?
     - Q5: Write 2–3 sentences summarizing what your model relies on and whether any features raise potential fairness or bias concerns?

NOTE: You only need to write short answers. Most cells can run directly.

## Getting Started
Clone [this](https://github.com/nikitachaudharicodes/mlip-explainability-lab) repository and follow instructions in the notebook.

### Install Dependencies

For this assignment, make sure you have the required packages installed.
```
pip install -r requirements.txt
pip install shap
```
_(If there are any major unsolvable issues prefer running this notebook on Google Colaboratory)_

### Possible Issues with installing Alibi
`TypeError: issubclass() arg 1 must be a class` \
**Solution:** https://stackoverflow.com/questions/76313592/import-langchain-error-typeerror-issubclass-arg-1-must-be-a-class
<br><br>
If there's any more issues, please contact a TA to update this list (with a solution if its solved)

## References
1. https://docs.seldon.io/projects/alibi/en/stable/examples/pdp_regression_bike.html
2. https://docs.seldon.io/projects/alibi/en/stable/methods/PartialDependence.html
3. https://docs.seldon.io/projects/alibi/en/stable/examples/anchor_image_imagenet.html
4. https://shap.readthedocs.io/en/latest/

