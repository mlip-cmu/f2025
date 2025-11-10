# Individual Assignment 4: Explainability

(17-445/17-645 Machine Learning in Production)

## Overview

In this assignment you will consider how to explain a model and its decisions to end users. You will prototype global explanations and individual explanations. 

Learning goals:

* Understand and distinguish the different notions of transparency, interpretability, and explainability
* Explore explainability needs from the perspective of the end user
* Use state-of-the-art tools for model explainability to generate model and individual explanations
* Consider the need of end users, not just developers

## Research in this Course

*We are conducting academic research on explainability policies and evidence. This research will involve analyzing student work of this assignment. You will not be asked to do anything above and beyond the normal learning activities and assignments that are part of this course. You are free not to participate in this research, and your participation will have no influence on your grade for this course or your academic career at CMU. If you do not wish to participate, please send an email to Nadia Nahar ([nadian@andrew.cmu.edu](mailto:nadian@andrew.cmu.edu)). Participants will not receive any compensation or extra credit. The data collected as part of this research will not include student grades. All analyses of data from participants’ coursework will be conducted after the course is over and final grades are submitted -- instructors do not know who choses not to participate before final grades are submitted. All data will be analyzed in de-identified form and presented in the aggregate, without any personal identifiers. The de-identified homework solutions (without grades) will be shared with research collaborators at Yale university for further analysis. If you have questions pertaining to your rights as a research participant, or to report concerns to this study, please contact Nadia Nahar ([nadian@andrew.cmu.edu](mailto:nadian@andrew.cmu.edu)) or the Office of Research Integrity and Compliance at Carnegie Mellon University ([irb-review@andrew.cmu.edu](mailto:irb-review@andrew.cmu.edu); phone: [412-268-4721](tel:4122684721)).*

# The Use Case: Diabetic Retinopathy Screening

The use case is to detect [diabetic retinopathy](https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/diabetic-retinopathy) early with a special purpose ML-powered medical device. Diabetic retinopathy is a condition that can result in vision loss if left untreated. [AEYE Health](https://www.aeyehealth.com) is a comparable commercial offering.

Consider you are building a smartphone app, replacing current large commercial devices. The app will be used by trained users (nurses, volunteers) to perform screenings to detect potential problems simply by having patients look into the smart phone's camera through a specialized lens attachment (a small 3-d printed holder for a lens).

Deploying such medical diagnostics as a smart phone app and low-cost hardware extension has the potential to drastically reduce screening costs and make screenings much more available, especially in underresourced regions of the world. Instead of having to travel to a clinic with specialized equipment, trained users could perform screenings at mobile clinics or in patients homes. The app would provide information about a potential risk and encourage the patients to get in contact with medical professionals for more accurate testing and potential treatment.

In this assignment, you will focus not only on the model, but also consider its integration into a smartphone app and its use for screening by trained users in underresourced regions (e.g., remote areas, high-poverty areas).

## Tasks

In this assignment, you will work with a provided model for a potential medical application ([diabetic retinopathy detection with a smartphone app](https://github.com/cmu-seai/diabetic-retinopathy)), create explanations, and demonstrate compliance with policy requirements. You will provide explanations *for patients and nurses/volunteers*. While we only provide the model and training/test data, assume that the model is embedded in a real-world software product as described above. 

**See Canvas hint.** On Canvas you can see a personalized hint for you for this assignment. Please do not share or compare this hint with others in the course before submitting the assignment.

**Understanding explainability needs.** First, consider what a *nurse* or *volunteer* who is screening patients might want to know about the product, the model, or the data (transparency).  The goal is to enable the nurse/volunteer to understand the system (as needed), to use it responsibly, to answer patient questions, and to provide effective oversight  ("human in the loop"). Second, identify what a *patient* would want to know about individual predictions and why. 

Consider using personas, chatbots with personas, hazard analysis, or interacting with actual people with experience in this role to understand their needs. Consider the model in the context of the software system and consider how that software system is embedded in the larger medical context. You likely will want to better understand the disease and the medical process for screening and treatment first, as well as challenges with deploying this in underresourced and remote areas.

**Device handbook for nurses/volunteers (global explanations):**  To meet the previously identified explanation needs of the nurses/volunteers, create a PDF file  `explanation_global.pdf` that includes information in a form that the company producing the product *may disclose in its handbook*. This might include information about the data, about accuracy, about important features, or about fairness -- you will likely write some code to produce relevant information for this document. Argue why your solution is suitable for the intended stakeholder and their needs.

**Individual explanations for patient handouts:** Create explanations that you could give to a patient *as a handout after the screening*. Argue why your solution is suitable for the intended stakeholder and their needs. Write code that produces explanations or fragments of explanations *for a specific input* for a patient, possibly automatically producing HTML pages from a template. Create a PDF file  `explanation_local.pdf`  (generated with code) that shows the explanations for *two* patients (example inputs) -- that is concatenate the explanations for two selected patients in the same PDF. Provide brief instructions on how to run the code to create explanations for other inputs.

**Reflection:** In a separate "Reflection" section of your Gradescope submission answer the following questions (questions 5-9 do not require explanations, but you are welcome to provide more context). **We would strongly appreciate if you could answer these questions without using GenAI** -- we would rather have a few honest, rough, possibly misspelled bullet points than generic AI slop.

1. How was the hint on Canvas useful or not useful for completing the assignment?

2. What did you do to *evaluate* whether your solution meets the needs of nurses/volunteers and patients, if anything?

3. What additional things would you do to evaluate whether your solution meets the needs of nurses/volunteers and patients before deploying this system in the real world, if anything?

4. What prior experiences did you have that helped you approach this assignment? Or what experience do you wish you have? 

5. Have you taken a college-level course on writing? [yes/no]

6. On a scale of 1 to 5 (5 most difficult), how difficult was it to provide an explanation in plain language? [1-5]

7. On a scale of 1 to 5 (5 most difficult), how difficult was it to provide the global explanation for nurses/volunteers? [1-5]

8. On a scale of 1 to 5 (5 most difficult), how difficult was it to provide the local explanations for patients? [1-5]

9. On a scale of 1 to 5 (5 most useful), how useful was this assignment to your learning about ML explainability? [1-5]

   



### Hints and guidance

A key goal is to provide explanations for the specified target audience (nurses, volunteers, patients) and their needs when this system is deployed. Consider what these people might want to know and what they are likely to understand. Actively try to understand their perspective and how the model fits into the software and how that software fits into the medical system more broadly. You may want to conduct some Internet research, talk to relevant people, or brainstorm with a chatbot.  The goal is *not* to merely provide explanations that you wish you would receive or explanations for developers to debug the model. Less may be more.

This assignment is intentionally open ended. We interpret explainability broadly, including technical post-hoc explanations like SHAP, local and global explanations, nontechnical textual descriptions and traditional transparency mechanisms, such as audits and model and data disclosures. We have no specific requirements about approaches or techniques to include; make a judgment about what you think is needed and understandable to the intended target audience.

You can explore many different explainability and transparency techniques, including the ones discussed in class and in the lab and ones you find on your own. We recommend to rely on existing explainability tooling for nontrivial analyses rather than to develop your own. Many existing tools can generate plots that you can integrate into the websites you generate, but textual explanations are also perfectly acceptable. Think about what the target audience needs. We do not care about the visual quality of the generated PDFs.

There is no single right explanation and we expect to see a very wide range of very different solutions. We are looking for a plausible solution where you argue why this solution is suitable, not any specific tool or design. 

## Deliverable

Submit all code you used to the GitHub repository you created with GitHub classroom for this assignment. Commit the PDF files `explanation_global.pdf` and `explanation_local.pdf` to *the root directory* of your GitHub repository. Do not include your own name or Andrew ID in those two PDFs, if possible.

Submit a report as a single PDF file to Gradescope that covers the following topics in clearly labeled sections:

1. **GitHub link:** Start the document with a link to your last commit on GitHub in the format https://github.com/mlip-cmu/[repo]/commit/[commitid]. Make sure that the link includes the long ID of the last commit.
2. **Explanation needs**  (2 pages max): Describe the steps you took to identify explanation needs and provide some corresponding evidence (e.g., links to resources considered, links to chatbot transcripts, hazard analysis steps, personas). Describe the explanation needs you identified for (a) nurses/volunteers and (b) patients.

3. **Explanations.** (2 pages max): Describe what kind of explanations you created (global and local) and link them to the previously identified explanation needs. Point out where we can find this explanation in `explanation_global.pdf` or `explanation_local.pdf` if it is not obvious. Provide links to code for creating the data or visualization used and point out specific techniques or tools, if you used any. Explain how we can produce local explanations for other inputs with your code.

4. **Reflection** (2 page max): Include answers to the questions above in a clearly separated subsection. Good reflections are honest and grounded in concrete observations or specific experiences. Please do not use GenAI for this part. Avoid generic statements that could apply to most solutions.


Page limits are recommendations and not strictly enforced. You can exceed the page limit if there is a good reason. We prefer precise and concise answers over long and rambling ones.

## Grading

The assignment is worth 100 points. For full credit, we expect:

* [ ] 10 points: The document includes a link to a specific commit in your GitHub repository created with GitHub classroom. 
* [ ] 20 points: Explanation needs are described for both nurses/volunteers and patients. The process for identifying the information needs is described and some evidence is provided that the process was followed.
* [ ] 20 points: A PDF file `explanation_global.pdf` is included in the root directory of the linked repository that contains the global explanations (handbook) for nurses/volunteers. The report explains how this meets the previously identified explanation needs. The PDF corresponds to the description in the report.
* [ ] 20 points: A PDF file `explanation_local.pdf` is included in the root directory of the linked repository that contains the individual/local explanations (patient handouts) for *two* patients. The report explains how this meets the previously identified explanation needs. The PDF corresponds to the description in the report.
* [ ] 10 points: Code is provided that can provide local explanations for other patients. Instructions are clear on how to create additional local explanations.
* [ ] 10 points: The global and local explanations are clearly designed for the intended target audience, rather than developers. The report explains the anticipated explanation needs for the target audience and how the explanations intend to provide it.
* [ ] 10 points: A good-faith attempt at answering all the reflection questions.

