# Individual Assignment 2: Requirements

(17-445/17-645/17-745 Machine Learning in Production; 11-695 AI Engineering)

## Overview

In this assignment, you will zoom out from the ML component and think about the requirements and risks associated with a larger ML-enabled system in a concrete scenario. 

In this assignment, you will get practice on how to systematically identify system requirements and risks associated with a larger ML-enabled system. In particular, you will learn to (a) make a clear distinction between the roles that environmental and machine entities play in system dependability, and (2) hazard analysis and apply fault tree analysis (FTA) to identify and analyze potential risks in a case study scenario involving a vehicle dash cam. 

Learning goals:
* Understand the role of the environment in establishing system requirements.
* Learn to systematically identify risks and design mitigation strategies.
* Apply hazard analysis to anticipate risks
* Apply FTA to understand risks and plan mitigations in an AI-enabled system
* Understand the strengths and limitations of FTA.

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

Overall, you are concerned at least about the following qualities:

1. Latency between reporting a child missing (with numerous pictures) to receiving potential matches from dashcam users
2. Number of false positives and false negatives reports of detected missing children
3. Ability to observe how well the system works in production
4. Scalability and cost of running the infrastructure with many users across many countries
5. Operating costs for users operating the dashcam
6. Difficulty of changing and updating the system to meet new requirements or incorporate better technology
7. Privacy
8. Development cost, technical complexity of the solution, and maintainability

## Tasks

Think about requirements for such a system and how would you decompose them into specifications on individual components (AI or not). What assumptions about the environment does this system need to rely on? What could go wrong and how could risks be mitigated? 

First, identify the goals for the new feature in the dashcam. Break down goals into *organizational goals*, *system goals*, *user goals*, and *model goals* and design corresponding *measures* you could use to assess how well you achieve the goals. The measures could be described in the 3-step process (measure, data, operationalization, see Model Accuracy lecture) with sufficient precision for others to conduct the measurement independently, manually or automatically. Provide a brief description of how goals relate to each other (e.g., “better model accuracy should help with higher user satisfaction”). Organizational objectives must be stated from the perspective of the dashcam company (not the partnering non-profits or authorities).  For user outcomes and model properties, make clear to which users or models the goal refer; you may state different goals for different users/models. Your list of goals should be reasonably comprehensive and may include multiple goals at each level.

Second, use hazard analysis to proactively identify possible risks the system has/creates from the perspective of different stakeholders. We recommend to follow a process similar to STPA, that considers stakeholders, their values, and possible corresponding losses to identify risks.

Third, think back to the *world vs machine* discussion in class. Consider one of the critical requirements of the system (REQ) related to one of the identified risks. What assumptions about the environment (ASM) do you need to rely on to achieve this requirement? What are the responsibilities (SPEC) of the machine components (both AI and non-AI) that are needed to establish REQ in conjunction with ASM?

Fourth, think about what could go wrong for this requirement. Use fault tree analysis to analyze possible causes for violating the requirement. Start with the top event for violating of the requirement and break it into intermediate and basic events (which may correspond to a violation of an environmental assumption or an AI component making mistakes). From the fault tree, derive minimal cut sets. Finally, design at least two strategies for mitigating the risks of potential failures and incorporate them into the fault tree. Mitigation strategies will typically be at the system level, outside of the AI component itself, and will reduce the risk of the requirement violation. Briefly explain how each suggested mitigation strategy can (partially for fully) address the risk.



## Deliverable

Submit a report as a single PDF file to Gradescope that covers the following topics in clearly labeled sections (ideally each section starts on a new page):

1. **Goals** (2 pages max): Provide a list of organizational goals, system goals, user goals, and model goals, each with a corresponding measure.
2. **Environment and Machine** (0.5 page max): Identify environmental entities and machine components (AI and non-AI) in this scenario. The machine components must include at least one AI component that performs image recognition.
3. **Hazard analysis** (2 pages max): Perform STPA-style hazard analysis to proactively identify possible risks from the perspective of different direct and indirect stakeholders. Describe the hazard analysis steps you followed and the risks you identified.
4. **Requirement Decomposition** (1 page max): Select **one** requirement to analyze, corresponding to one of the risks identified above. Specify a list of environment assumptions (ASM) and specifications (SPEC) that are needed to establish this requirement (REQ).
5. **Risk analysis** (2 pages max): Perform a fault tree analysis to identify potential root causes for the violation of the requirement selected in the previous step. Identify all minimal cut sets in your fault tree. 
6. **Mitigations** (1 page max): Suggest at least two mitigation strategy to reduce the risk of the failure studied in the fault tree. Both mitigations should be at the system level, outside of the ML component (i.e., not just "collect more training data"). Briefly explain how the mitigations reduce the risk. Provide a second updated fault tree that includes those mitigations.

For drawing fault trees, you may use any tool of your choice (e.g., Google Drawings or [draw.io](https://app.diagrams.net/)). A scan of a hand-drawn diagram is acceptable, as long as it is clearly legible. There are also dedicted FTA apps you could use; e.g., [Fault Tree Analyzer](https://www.fault-tree-analysis-software.com). We are not picky about the exact shapes in the notation as long as the connections are clear.

Page limits are recommendations and not strictly enforced. You can exceed the page limit if there is a good reason. We prefer precise and concise answers over long and rambling ones.

## Grading

The assignment is worth 100 points. For full credit, we expect:

* [ ] 10 points: Goals are listed and appropriately grouped. There is at least one goal for each of the four categories of goals. The goals relate to the scenario and are reasonably complete.
* [ ] 10 points: A measure is provided for each goal. Each measure is clearly described in the 3-step method of measure-data-operationalization, with the information clearly associated with the correct step and with enough detail that somebody could independently conduct measurement.
* [ ] 10 points: Environment entities and machine components relevant to the scenario are listed. The machine components include at least one AI component that performs image recognition.
* [ ] 15 points: The process and intermediate results of a hazard analysis is described, that includes identifying stakeholders, their values/goals, and corresponding losses. At least 3 stakeholders are analyzed; both direct and indirect stakeholders are analyzed. A plausible list of risks is provided.
* [ ] 15 points: A single selected requirement (REQ), environmental assumptions (ASM), and machine specifications (SPEC) are clearly stated, corresponding to one of the risks identified in the hazard analysis. The requirements mention only phenomena in the world. It relates to a system goal discussed in Section 1. All stated assumptions relate to phenomena in the world or map those to shared phenomena accessibly by the machine. All stated specifications mention only those phenomena in the interface between the world and the machine. The requirement, environmental assumption, and machine specifications fit reasonably together and correspond to the scenario.
* [ ] 15 points: A fault tree that shows possible causes behind the violation of the requirement selected in the requirements decomposition step. The included fault tree is syntactically valid.
* [ ] 10 points: *All* minimal cut sets are identified from the fault tree.
* [ ] 15 points: At least two mitigation strategies, corresponding to the requirement and the cut sets identified, are described. The description explains how the risk is reduced. The mitigations are at the system level outside the ML component. The mitigations are reflected correctly in an updated fault tree.

