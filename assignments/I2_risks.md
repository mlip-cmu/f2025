# Individual Assignment 2: Risks and Mitigations

(17-445/17-645/17-745 Machine Learning in Production; 11-695 AI Engineering)

## Overview

In this assignment, you will zoom out from the ML component and think about about risks and how to mitigate them for an ML-powered system in a concrete scenario. We will use several approaches to consider proactively think about risks through the lens of requirements and safety engineering.

Learning goals:
* Understand the role of the environment and environmental assumptions in system risks and establishing system requirements
* Consider multiple different mitigation strategies in the system design to eliminate or reduce risks
* Design reliable measures for qualities of interest
* Apply hazard analysis to anticipate risks
* Apply FTA to understand risks and plan mitigations in an AI-enabled system
* Understand the strengths and limitations of these techniques.

## Scenario

[Dashcams](https://en.wikipedia.org/wiki/Dashcam) are getting more popular and are broadly installed in many vehicles already. As a commercial manufacturer of dashcams who sells directly to end consumers but also to automotive manufacturers, you want to develop features that distinguish your dashcams from those of your competitors. As one project, you work with a non-profit organization on *child safety*: The project's goal is to use dashcam footage to locate children reported missing. However, instead of broadcasts, such as [Amber alerts](https://en.wikipedia.org/wiki/Amber_alert) your products will allow to search for those children in video recordings made by the dashcam.

Assume that you are contracting out the AI component that recognizes persons in images and video to a company with extensive experience in face recognition based on deep neural networks (including face recognition in distorted images and in low-light conditions). The contractors build on past tools and infrastructure (e.g., [Amazon Rekognition](https://aws.amazon.com/rekognition/)) but will customize one or multiple components to your needs, to the extent possible (e.g., deploying models offline would be an option). They will provide you with the infrastructure to fine-tune and serve person recognition models, which you can operate and update in-house.

In designing such system, there are many considerations, such as:
* Your dashcams do not have direct internet access, but they can communicate over USB, Bluetooth or Wifi with phones, cars, and wifi-hotspots.
* The dashcams may run on battery but are usually connected to the car's power supply. Their processing power differs from model to model.
* Searches are coordinated with the authorities and the non-profit organization. You suspect less strict requirements as for Amber alerts, but the legal details are not worked out yet. Searches are likely not very frequent in any given area. For Amber alerts, [official statistics](https://amberalert.gov/statistics.htm) report about 1 alert per day *nationwide*.
* Faster reports of sightings are more useful to the authorities.
* You suspect users may be worried about privacy and charges for data.
* You recently hear everywhere, including press and consultants, how exciting the future of [Edge computing](https://en.wikipedia.org/wiki/Edge_computing) rather than Cloud computing is going to be and wonder whether you should explore that. You wouldn't be opposed to thinking about partnering with other organizations to, say, install hardware in gas stations or drive-throughs.

## Tasks

The main goal of this assignment is to anticipate and mitigate risks in the system, using tools from requirements and safety engineering. We guide this through six steps:

First, identify direct and indirect stakeholders who care about or are affected by the system and the new feature. Aim for at least 4 direct and 6 indirect stakeholders.

Second, understand the goals of this project, especially the goals of the different stakeholders and how they may or may not align with the system and model goals. For this assignment, explicitly break down goals into *organizational goals*, *system goals*, *user goals* (for at least 3 different stakeholders; we accept generally goals of any stakeholder whether they are directly using the system or not), and *model goals*. To ensure that the goals are concrete and measurable, design a *measure* for one goal from each category that you could use to assess how well you achieve those goals. The measures could be described in the 3-step process (measure, data, operationalization, see Model Accuracy lecture) with sufficient precision for others to conduct the measurement independently, manually or automatically. Provide a brief description of how goals relate to each other (e.g., “better model accuracy should help with higher user satisfaction”). Organizational goals must be stated from the perspective of the dashcam company (not the partnering non-profits or authorities).  For user outcomes and model properties, make clear to which user(s) or model(s) the goal refer; you may state different goals for different users/models. Your list of goals should be reasonably comprehensive and may include multiple goals at each level.

Third, based on goals of different stakeholders perform hazard analysis to proactively identify possible risks from their perspectives. Since we are considering possible harms to specific stakeholders, we focus mostly on user goals. Follow the early steps of an STPA-style analysis, as introduced in class, to identify values and goals per stakeholder, identify possible losses, and turn those into requirements. Perform this step for the three stakeholder and their goals from the previous step and aim for about 5 to 10 risks per stakeholder.

Fourth, analyze the requirements with a critical focus on assumptions the system designers may make that do not actually hold. For the process, select one of the requirements of the system (REQ) derived from the previous step; pick a requirement that seems important to get right. List plausible assumptions about the environment (ASM) commonly made that are needed to achieve this requirement. Also identify the responsibilities (SPEC) of the software components (both AI and non-AI) that are needed to establish the REQ in conjunction with ASM. Aim for at least one specification and 5 assumptions.

Fifth, think systematically about what could go wrong for the same requirement and model it as a fault tree. Start with the top event for violating of the requirement and break it into intermediate and basic events (which may correspond to a violation of an environmental assumption or an AI component making mistakes). The fault tree should cover possible violations of assumptions and specifications from the previous step (if plausible), but can include additional information. 

Finally, describe at least two strategies for mitigating the risks of potential failures for the analyzed requirement and incorporate them into the fault tree. Mitigation strategies will typically be at the system level, outside of the AI component itself, and will reduce the risk of the requirement violation. Briefly explain how each suggested mitigation strategy can (partially for fully) address the risk.

## Deliverable

Submit a report as a single PDF file to Gradescope that covers the following topics in clearly labeled sections (ideally each section starts on a new page):

1. **Stakeholders** (1 page max): List of 10 or more relevant stakeholders, roughly separated in direct and indirect stakeholders.
2. **Goals** (2 pages max): Provide a list of organizational goals, system goals, user goals, and model goals. Include at least three different user goals corresponding to three stakeholders identified in the previous step. Provide a concrete measure for at least one organizational goal, one system goal, one user goal, and one model goal.
3. **Hazard analysis** (3 pages max): Briefly describe the hazard analysis steps you followed and illustrate it by providing data from intermediate steps. List risks and corresponding requirements for the stakeholders selected in the previous steps (typically 5 to 10 per stakeholder). 
4. **Requirement Decomposition** (1 page max): Select *one* requirement identified in the previous step to analyze. Specify a list of environment assumptions (ASM) and specifications (SPEC) that are needed to establish this requirement (REQ).
5. **Risk analysis** (1 figure): Perform a fault tree analysis to identify potential root causes for the violation of the requirement selected in the previous step. The resulting fault tree should include all plausible violations of assumptions and specifications identified in the previous step.
6. **Mitigations** (0.5 page max and 1 figure): Suggest at least two mitigation strategy to reduce the risk of the failure studied in the fault tree. Both mitigations should be at the system level, outside of the ML component (i.e., not just "collect more training data"). Briefly explain how the mitigations reduce the risk. Provide a second updated fault tree that includes those mitigations.

For drawing fault trees, you may use any tool of your choice (e.g., Google Drawings or [draw.io](https://app.diagrams.net/)). A scan of a hand-drawn diagram is acceptable, as long as it is clearly legible. There are also dedicted FTA apps you could use; e.g., [Fault Tree Analyzer](https://www.fault-tree-analysis-software.com). We are not picky about the exact shapes in the notation as long as the connections are clear.

Page limits are recommendations and not strictly enforced. You can exceed the page limit if there is a good reason. We prefer precise and concise answers over long and rambling ones.

## Grading

The assignment is worth 100 points. For full credit, we expect:

* [ ] 10 points: At least 10 stakeholders are identified. The stakeholders are relevant to the scenario. The list includes both direct and indirect stakeholders.
* [ ] 15 points: Goals are listed and appropriately grouped. There is at least one organizational goal, one system goal, three user goals corresponding to three of the previously identified stakeholders, and one model goal. The goals relate to the scenario and are plausible for the scenario.
* [ ] 15 points: A measure is provided for at least one organizational goal, one system goal, one user goal, and one model goal. Each measure is clearly described in the 3-step method of measure-data-operationalization, with the information clearly associated with the correct step and with enough detail that somebody could independently conduct measurement.
* [ ] 15 points: The process and intermediate results of a hazard analysis is described, that considers stakeholders, their values/goals, and corresponding losses. At least 3 stakeholders are analyzed. A plausible list of at least 5 risks and corresponding requirements is provided for each analyzed stakeholder.
* [ ] 15 points: A single requirement (REQ) is selected from the previous step for further analysis. At least 3 environmental assumptions (ASM) and at least one software specifications (SPEC) necessary to fulfill the requirement are clearly stated. The requirement mention only phenomena in the environment ("world"). All stated assumptions relate to phenomena in the environment or map those to shared phenomena accessibly by the software ("machine"). All stated specifications mention only those phenomena in the interface between the environment and the software. The requirement, environmental assumption, and software specifications fit reasonably together and are plausible in the scenario.
* [ ] 15 points: A fault tree that shows possible causes behind the violation of the requirement selected in the requirements decomposition step. The included fault tree is syntactically valid. The fault tree includes at a minimum the violation of assumptions and specifications identified in the previous step (if plausible).
* [ ] 15 points: At least two mitigation strategies, corresponding to the requirement, are described. The description explains how the risk is reduced or eliminated. The mitigations are at the system level outside the ML component. The mitigations are reflected correctly in an updated fault tree.

# Notes

A note on realism: If you wanted to be comprehensive in a real project, you would go through all or most stakeholders and their goals, all identified risks, and consider assumptions or fault trees for all requirements that seem important. This might product many pages of paperwork, but can also provide important insights. Here we intentionally down-select after most steps to keep the assignment manageable, so you only analyze three stakeholders and one risk.

A formal process and clear documentation may be required in a few regulated safety-critical domains (e.g., airplanes, medical devices). A few organizations may have in-house mandates. Unless required, developers often skip proactive analysis and focus on delivering features first. Our position is that even a lightweight analysis can identify many problems before they occur, lead to better designs, and prevent real harms. It may not be productive to go manually through thousands of risks on paper, but slowing down occasionally, more closely questioning assumptions where risks are high, and considering mitigations early may be the responsible thing to do.
