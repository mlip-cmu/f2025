# Group Project: Movie Recommendations

(17-445/17-645/17-745 Machine Learning in Production; 11-695 AI Engineering)

## Overview

In this project, you will implement, evaluate, operate, monitor, and evolve a recommendation service for a scenario of a movie streaming service. You work with a scenario of a streaming service with about 1 million customers and 27,000 movies (for comparison, Netflix has about 180 million subscribers and over 300 million estimated users worldwide and about 13,000 titles worldwide). Consider you are in the early days of video streaming and are building a Netflix-like streaming business with a massive catalog of not very recent movies that you could license cheaply.

The focus of this assignment is to *operate* a recommendation service *in production*, which entails many concerns, including deployment, scaling, reliability, drift and feedback loops.

The assignment has multiple milestones and a final project presentation. It has a total of 415 points.

## Overall mechanics and infrastructure

**Teamwork:** You will work on this project in your assigned teams. As a team, you will use a shared GitHub repository and a virtual machine to coordinate your work. Please establish a way of communication and collaboration that works for your team -- for example, a Slack channel and a Trello board. Please agree on how you take clear notes at meetings that include agreed tasks and responsibilities. We expect that team members will have different backgrounds and different amounts of experience with machine learning and software engineering -- this is intentional. Use the first milestone to identify strength and weaknesses, fill missing gaps in background knowledge, and teach each other about tools and practices that are effective for this task. We will provide bonus points when team members go outside their comfort zone and explore new/challenging concepts. We do not expect that all team members contribute equally to each part of the project, but we expect that all team members make every effort to be a good team citizen (attend meetings, prepared and cooperative, respect for other team members, work on assigned and agreed tasks by agreed deadlines, reaching out to team members when delays are expected, etc). We will regularly check in about teamwork with a mandatory survey and perform *peer grading* to assess team citizenship of individual students after every milestone (see this [paper](http://www.rochester.edu/provost/assets/PDFs/futurefaculty/Turning%20Student%20Groups%20into%20Effective%20Teams.pdf) page 28-31 for procedure details and this [site](https://mlip-cmu.github.io/f2025/assignments/peergrading.html) to preview impact on grades). We will debrief with each team after every milestone and discuss teamwork issues raised. 

**Project mentor:** Each team is assigned to a TA who acts as mentor for the project. Each mentor has completed the project themselves in the past. Mentors will discuss and help with teamwork issues. While the mentor will not pre-grade milestones, they can help with clarifying grading expectations and may be able to provide feedback on technical decisions. Each team conducts a debriefing with their mentor after every milestone.

**Milestones:** For each milestone and the final presentation, there are separate deliverables, described below. The milestones are checkpoints to ensure that certain functionality has been delivered. Milestones are graded on a pass/fail scheme for the criteria listed with each milestone. Teams may submit work for milestones late or redo milestones with their team tokens as described in the [syllabus](https://mlip-cmu.github.io/f2025/).

Milestones build on each other. We recommend to look at *all* milestones before starting the project, as this might help you to make more future-proof design decision that avoid extensive rework later.

**Infrastructure:** We provide a virtual machine for each team and will send recommendation requests to your virtual machines. You receive data about movies and users through an API and can access log files from past movie watching behavior through a Kafka stream (see the assignment text for M1 on Canvas for server addresses and credentials). We provide separate streams for each team (`movielog<TEAM-NR>`). You will provide a prediction service API from your virtual machine. You can but do not need to perform all executions on that machine -- for example, you may build a distributed system with multiple cloud instances, where you use the provided virtual machine only as API broker or load balancer. You may request more computing resources from the course staff if the virtual machine’s resources are insufficient -- we may or may not be able to accommodate such requests, it may take a few days, and will usually require a system reboot.

**Provided data:** We provide an event stream (Apache Kafka) of a streaming service site that records server logs, which include information about which user watched which video and ratings about those movies. The log has entries in the following format:

* `<time>,<userid>,recommendation request <server>, status <200 for success>, result: <received recommendations>, <responsetime>` – the user considers watching a movie and a list of recommendations is requested; the recommendations provided by your service are included (or an error message if your service did not provide a valid response)
* `<time>,<userid>,GET /data/m/<movieid>/<minute>.mpg` – the user watches a movie; the movie is split into 1-minute mpg files that are requested by the user as long as they are watching the movie
* `<time>,<userid>,GET /rate/<movieid>=<rating>` – the user rates a movie with 1 to 5 stars

In addition, we provide read-only access to an API to query information about users and movies. Both APIs provide information in JSON format, which should be mostly self-explanatory. Note that movie data, including “vote_average”, “vote_count” and “popularity” fields come from some external database and do not reflect data on the movie recommendation service itself. In addition, you may collect data from external data sources not provided by the course staff; ids for [IMDB](https://www.imdb.com/) and [TMDB](https://www.themoviedb.org/) are provided for each movie.

You do not need to use all provided data from the stream or APIs. Identify what data is relevant. Plan for the fact that data gathering and cleaning data may take some time; the provided raw data is fairly large and you may need some time to download and process it. The APIs are rate-limited to avoid abuse. If Internet bandwidth is a problem, consider performing some preprocessing on machines within the CMU network.

The addresses and credentials for the provided event stream and the APIs can be found on Canvas in the text of assignment M1.

**Languages, tools, and frameworks:** Your team is free to chose any technology stack for any part of this project. You have root access to your virtual machine and are free to install any software you deem suitable; but be responsible and careful as you also have the power to misconfigure the machine to make it insecure or inaccessible. You also may use external data and services (e.g. cloud services) as long as you can make them also accessible to the course staff. For example, you are welcome use the cloud services from Microsoft, Google, or AWS (most provide free credits to students). Whenever you set up tools or services, pay some attention to configuring them with reasonable security measures; past student solutions have been actively exploited in the past and this can lead to data loss or loss of Internet access for your virtual machine.

**Documentation and reports:** For all milestones, we ask you to discuss some aspects of your design decision and implementation. It may be a good idea to write general documentation that is useful for the team in a place that is shared and accessible to the team (e.g., [README.md](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) or [wiki pages](https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis) on GitHub). Conversely it may be a good idea to include text or figures you write for reports as part of the project documentation. Feel free to simply copy material from your documentation into the report.

In general, we do not much care about the format or location of where we can find parts of your answers, such as code and screenshots, as long as we can find it. Please make an effort to be clear where to find content if it is not copied directly into the report, preferably with direct links to individual files or even lines (e.g., such as `https://github.com/ckaestne/seai/blob/F2022/assignments/project.md?plain=1#L39`).

Note, that links can be difficult to see in PDFs on Gradescope, especially hyperlinks behind text. Please make it obvious where we should look for links. We prefer if you copy the full link into the text, rather than creating hyperlinks for words in the text.



## Milestone 1: Recommendation Model and First Deployment

**Learning goals:**

* Collect data from multiple sources and engineer features for learning
* Apply state of the art machine learning tools
* Deploy a model inference service 
* Measure and compare multiple quality attributes of your model
* Practice teamwork and reflect on the process

**Tasks:** 

*Get started as a team:* Get familiar working as a team. Discuss how you plan to collaborate, assign a project manager, and write down a team contract. Take notes at team meetings about how you divide the work (minimum: who is going to do what and by when).

*Train a model:* Train a model that can recommend movies for a specific user. There are many different approaches to learn models for recommendations; some consider past ratings, some use similarity between users or between movies, others may use subtle clues about how users behave about signs of what they like.

*Compare two models:* You will likely explore different kinds of models developed with different modeling techniques. Compare at least two models in terms of (1) some notion of prediction accuracy, (2) training cost, (3) inference cost (or throughput in production), and (4) disk or memory size of the model. For each of these qualities define a measure (using the three steps metric, data, and operationalization; described clearly enough that it could be independently reimplemented) and report results from at least two models. 

*Serve your model:* Build a model inference service that provides movie recommendations on request given your learned model (e.g. using [flask](https://flask.palletsprojects.com/en/1.1.x/)). Specifically, we will start to send http GET requests to `http://<address-of-your-virtual-machine>:8082/recommend/<userid>` to which your service should respond with an ordered comma separated list of *up to 20 movie IDs* in a single line, from highest to lowest recommendation (not JSON!). We will wait for answers to our requests for *at most 600ms*. You can recognize whether your answer has been correctly received and parsed by a corresponding log entry in the Kafka stream (look for status code 200 and the parsed list of recommended movie ids).

Note that users of the streaming service will immediately see recommendations you make and your recommendations may influence their behavior.

For this milestone, we do not care about specifics of how you learn or deploy your model, how accurate your predictions are, or how stable your service is.

**Deliverables:** Submit your code to GitHub and submit a short report to Gradescope and schedule a debriefing meeting with your team mentor. The report must include:

* Names of all team members who contributed to this milestone.
* *Learning* (1 page max): Briefly describe what data and what kind of machine learning technique(s) you use and why. Provide a pointer to your implementation where you train at least two different models (e.g. to GitHub or other services). 
* *Model comparison* (1 page of text max, the table does not count toward the page limit): Define a suitable measure for all four qualities above using the *three-step format* (1) metric, (2) data gathered, (3) operationalization. The description should be accurate enough that one could independently reimplement and repeat the measurement without having access to your code. Provide a link to any code you wrote to conduct the measurements. Provide a table that lists the four measurement results for the two models from the previous step and argue which of these models you will use in production. For example, this table could have rows for the four measures and columns for the two models and the cells would report the measurement results.
* *Prediction service* (1 page max): Briefly describe how you implemented the recommendation service and how you derive a ranking from your model. Provide pointers to the relevant parts of your implementation for model training and serving recommendations (e.g. to GitHub or other services).
* *Team contract and meeting notes* (1 page of text max,  figures do not count toward the page limit): Briefly describe your agreement on how your team organizes itself. This should include: 
  1. What expectations do you set for communication, such as what channels to use and how fast to expect a response? 
  2. How will you handle project and team management tasks, such as scheduling meetings, taking notes, and sending reminders? (name the team members responsible)
  3. What process do you use for dividing work and assigning responsibilities? 
  4. What should happen if a team member is not responsive, faces problems, or delays occur? 
  5. What other agreements did you make to avoid future teamwork problems, if any?
  6. Include a screenshot of (or link to) notes taken at team meetings that describe how how work was divided for this milestone: *who* was responsible for *what*, by *when*.

In this and all future milestones, page limits are not strictly enforced and can be broken if there is a good reason. We prefer precise and concise answers over long and rambling ones.

**Grading:** The grading specifications below focus on completing the work and each part is graded pass/fail. We will not attempt to evaluate the quality of the prediction service. We will not try to distinguish between better and worse solutions, but will give full credit if the specification is met and none otherwise for each item in the rubric. For example, if the teamwork notes do not include a due date for each task then all 10 points for that part are deducted, even if the description is otherwise well done. The specifications should be clear enough that you can confidently judge yourself whether you have achieved the goal; if in doubt check with the team mentor or other course staff. Note that you can regain lost points by resubmitting the solution as described in the [syllabus](https://mlip-cmu.github.io/f2025/).

This milestone is worth 100 points:

* [ ] 10pt: The report contains a description of the data used and the learning technique selected. The text explains why this approach was chosen. The described chosen approach matches the problem.
* [ ] 10pt: A link to the implementation of the learning step is provided. The implementation matches the description and addresses the learning problem. 
* [ ] 5pt each (up to 20pt): The report describes metrics of the four qualities explicitly in the three steps: metric, data, and operationalization. The correct information is described for each step and the description is clear and sufficient to independently measure the quality. A pointer to implementation of each measurement is provided. The results of the measure are reported and match to the metric description and the models. 
* [ ] 10pt: The report argues which of the compared models should be used in production, based on measurement results.
* [ ] 10pt: The report contains a description of the prediction service and explains how a ranking is computed. 
* [ ] 10pt: A link to the implementation of the prediction service is provided. The implementation matches the description.  
* [ ] 10pt: The report includes a team contract describing how the team plans to work together and handle problems. The team contract covers at least the five questions listed above. The report includes a screenshot of teamwork notes or a link to the notes is provided and those notes describe how the work was divided, answering *who* was supposed to do *what* by *when*.
* [ ] 10pt: The prediction services successfully answers at least 2000 recommendation requests in the 24 hours before or after submission. To be successful, the answer must be well-formed and arrive within the time limit. (We use the status message in the movielog for grading, considering status 200 as "successfully answered").
* [ ] 10pt: The prediction service answers at least 10% of all recommendation requests in the 24 hours before or after submission with *personalized* recommendations (i.e., `200` status, not the same recommendation for every user).
* [ ] 3pt (individually): The teammaker survey (on Catme) is filled out.
* [ ] 3pt (individually): The teamwork survey for this milestone is filled out and participating in a debriefing meeting with the team mentor shortly after the milestone submission.
* [ ] 3pt: Bonus points for social activity (see very end of this document)
* [ ] 3pt: Bonus points for going beyond the comfort zone (see very end of this document)



## Milestone 2: Model and Infrastructure Quality

**Learning goals:**

* Test all components of the learning infrastructure
* Build an infrastructure to assess model and data quality
* Build an infrastructure to evaluate a model in production
* Use continuous integration to test infrastructure and models

**Tasks:** 

*Model evaluation:* Evaluate the accuracy of your model both offline and online. For the offline evaluation, consider an appropriate strategy (e.g., suitable accuracy measure, training-validation split, important subpopulations, considering data dependence). Avoid common pitfalls in model evaluation, such as label leakage, data dependencies, overfitting on test data, and other common issues discussed in class. For the online evaluation, design and implement a strategy to evaluate a notion of model accuracy in production (i.e., choose and justify metric, collect telemetry).

*Pipeline implementation and testing:* If you have not done so already, migrate your learning infrastructure to a format that is easy to maintain and test. That will likely involve moving out of a notebook and splitting code for different steps in the pipeline into separate modules that can be called independently. Test all steps of your pipeline that can be reasonably tested, so that you have reasonable confidence in the correctness, robustness, and possibly other qualities of your pipeline implementation. To the degree reasonable, also test your model serving code.

*Data quality assurance:* Design, implement, and test a strategy to deal with data quality problems, especially schema enforcement and detecting substantial drift.

*Continuous integration:* Finally, automate all your tests in a continuous integration platform. The platform should automatically build and test your pipeline and prediction service implementation and create reports for test results and coverage. You can but are not required to trigger the actual model training and evaluation pipeline every time a new commit is made.

*Good commits and code review:* At this point, we do require that you work with Git for all your code and changes. Make reasonably cohesive commits with appropriate commit messages. We recommend adopting a process with your team in which you use [pull requests to review and integrate changes](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests).

**Technical details:** For *model accuracy*, we accept a wide range of possible metrics, including proxies that provide only partial insights about accuracy. Make a judgement about what metric is appropriate for the problem and feasible to implement. For *online* evaluation, you must use production data to test your model. You can evaluate the model with a snapshot of production data in this milestone; you do not need to continuously monitor the model until Milestone 3.

The *pipeline* refers to all parts of the learning process. This includes data collection, data cleaning, feature extraction, model training, model evaluation, serialization, serving, and telemetry collection. All those steps should be reasonably robust and repeatable. Overall, the implementation should make it easy to run the pipeline for experimentation (e.g., after changing hyperparameters or as new training data is available).

Evaluate *infrastructure code quality* by testing all steps in your model learning and evaluation pipeline, especially all code loading and processing data. You do not need to test whether the machine-learning algorithm itself is correctly implementated, but should test that you can use it to learn a model. Note that running tests with small amounts of sample data rather than full datasets from production is usually sufficient and appropriate. Use automated unit tests and report code coverage. For unit testing consider Python's builtin `unittest` or the external `nose2` or `pytest`; `coverage.py` or `Pytest-cov` can be used to measure coverage. Since testing is often much easier when code is deliberately written to be testable, you may want to refactor your code, e.g., extract the code that parses a line from Kafka as a separate, easily testable function. You may consider the use of mocks or stubs for testing, especially for parts that otherwise rely on network connections or files from the production system. Make own decisions about how much testing is appropriate to gain confidence in the correctness and robustness of your solution. 

Set up an *continuous integration* service. We recommend installing Jenkins on your virtual machine, but you could also use a cloud service, such as GitHub Actions and Circle-CI (note, cloud services typically provide limited credits that may be shared by the entire class). This service should run the unit tests for the infrastructure every time code changes are pushed to GitHub. (The CI infrastructure can also run your entire training job, but this is not required.)

For *data quality*, focus on data schema issues and identifying strong drift. During and after this assignment, we may inject data quality issues in the Kafka stream or provided API or we may make invalid requests to your API. Try to make your service robust, such that it continues to work despite such problems. You are not required to monitor drift continuously in this milestone.

You do not need to create a visual frontend for this milestone.

If you hit resource limits of your virtual machine, contact the course staff or consider using external cloud resources. 

**Deliverables:** Submit your code to GitHub and submit a short report to Gradescope and schedule a debriefing meeting with your team mentor. The report must include:

* *Offline evaluation* (1 page of text max, excluding figures/tables): Briefly explain how you conduct your offline evaluation. This should include a description of the validation/test data and how it was derived and a brief description and justification of the used accuracy metric (in the usual 3-step description). Include a brief discussion of how you avoided the common pitfalls in offline evaluations discussed in class. Include or link to evaluation results in your report. Provide a pointer to the corresponding implementation in your code (preferably a direct GitHub link).
* *Online evaluation* (1 page of text max, excluding figures/tables): Briefly describe the accuracy metric used for evaluating model quality in production, the telemetry data collected, and the operationalization of the metric. Include or link to evaluation results in your report. Provide a pointer to the corresponding implementation in your code (preferably a direct GitHub link).
* *Data quality* (0.5 pages max): Briefly describe the steps you have taken with regard to data quality and provide a pointer to the corresponding implementation in your code (preferably a direct GitHub link). The checks cover at least some schema issues and some possible drift.
* *Pipeline implementation and testing* (1 page max): Briefly describe how you structured the implementation of your pipeline and how you conducted testing. Include or link to a coverage report (figures do not count toward the page limit). Briefly argue why you think the testing is adequate. Provide a pointer to the corresponding implementation and test suite in your code (preferably a direct GitHub link).
* *Continuous integration* (0.5 pages max): Describe your continuous integration setup for infrastructure testing. Provide a pointer to the service (and credentials if needed to access the platform).
* *Pull requests* (optional): If you use code reviews and pull requests within you team, provide a very short description of your process and link to 3 examples of your own pull requests.
* *Team contract update:* If your team decided, after the last debriefing or based on experiences during this milestone, to revise the team contract from Milestone 1 or to change project management responsibilities, include the updated contract and describe the reason for the change, otherwise just state "no update to team contract".

**Grading:** This milestone is worth 100 points: 

* [ ] 10pt: Most commits (>60%) are reasonably cohesive and contain reasonable commit messages. The code is generally reasonably well structured and understandable.
* [ ] 10pt: The report describes how the pipeline is implemented and structured and contains a pointer to the pipeline implementation. The implementation matches the description.
* [ ] 15pt: Data quality checks are described in the report and implemented (with a link to the implementation provided). The description matches the implementation. At a minimum, (a) schema violations in inputs are detected and handled and (b) strong data drift is detected.
* [ ] 15pt: A suitable strategy for *offline* model evaluation is described in the report that covers (1) validation/test split, (2) a clear three-step description of the used metric, and (3) a plausible justification of why the metric is suitable for the problem and avoids common pitfalls. A link to a corresponding implementation that matches the description is provided. Offline evaluation results are included or linked for the used model that were computed with the described process and metric.
* [ ] 20pt: A suitable strategy for online model evaluation is described in the usual three step format: (1) the model accuracy metric used, (2) the telemetry data collected, and (3) how the metric is computed from the data. A link to a corresponding implementation that matches the description is provided. Online evaluation results that were computed with the described process and metric are included or linked.
* [ ] 15pt: A description of how the pipeline was tested is included in the report and a link to the corresponding tests is included. The report argues why the performed testing was adequate. A coverage report is included or linked.
* [ ] 10pt: The infrastructure tests are all automated with a continuous integration service and triggered automatically when code is changed on GitHub. A pointer to the service is provided.
* [ ] 5pt: An updated team contract is provided with a reason for the change, or a statement that the team contract remains unchanged is included.
* [ ] 3pt (individually): The teamwork survey for this milestone is filled out and participating in a debriefing meeting with the team mentor shortly after the milestone submission.
* [ ] 5pt: Bonus points for using pull requests and conducting code review within those pull requests for the majority of changes. A brief description of the process is included in the report.
* [ ] 3pt: Bonus points for social activity (see very end of this document)
* [ ] 3pt: Bonus points for going beyond the comfort zone (see very end of this document)



## Milestone 3: Versioning, Monitoring, and Continuous Deployment

**Learning goals:**

* Deploy a model prediction service with containers and support model updates without downtime
* Build and operate a monitoring infrastructure for system health and model quality
* Build an infrastructure for experimenting in production 
* Infrastructure for automatic periodic retraining of models
* Version and track provenance of training data and models

**Tasks:** 

*Availability:* Keep your recommendation service running as much as possible for the remainder of the project. We will evaluate the availability in the *72 hours before your submission and the 96 hours after your submission*. Prefer low-quality recommendations over missing responses or timeouts from your service. We will look for status 200 messages in the public Kafka logs to assess downtime. 

*Containers:* Containerize your model inference service (and possibly other parts of your infrastructure). Add support for switching between different versions without downtime (e.g., adding a load balancer). 

*Automated updates:* Setup an automated process to periodically train a new version of your model on more recent data and push those models into production (e.g. every 3 days).

*Monitoring:* Set up a monitoring infrastructure that monitors (a) the health of your recommendation service (including availability), (b) the quality of its predictions, and (c) data drift. You might want to set up automated alerts if problems are detected.

*A/B testing:* Create experimentation infrastructure, with which you can compare two models in production (e.g., for an A/B test or a canary release). Report confidence in differences between models using appropriate statistical tests. Demonstrate the experimentation infrastructure with a simple experiment comparing two models.

*Versioning and provenance:* Track provenance of your predictions and models such that for every prediction your recommendation service makes you can answer: (1) which version of the model has made the prediction, (2) which version of the pipeline code and ML algorithms has been used to train that model, and (3) what data has been used for training that model.

**Technical details:** We recommend Docker to containerize your model serving infrastructure. You can package the model inside the container or have the container load the model from an external resource. You can write your own simple load balancer in 10 lines of Python or Node.js code if needed. Some teams use orchestration software like Kubernetis or minikube to manage containers and updates, but the learning curve can be steep.  

For automatic model updates, we expect that you fully update the process and trigger it with a cronjob.

We recommend to mostly use existing tooling for monitoring, such as Prometheus and Grafana. You may use external cloud services if you prefer. Monitor at least (a) availability of your service (e.g., preferably analyzing the Kafka logs not just your own server's telemetry), (b) the online model accuracy measure from from Milestone 2, and (c) the data drift measure from Milestone 2.

For experimenting in production, you can write your own infrastructure or use an external library or service (e.g., [LaunchDarkly](https://launchdarkly.com/) or [split](https://www.split.io/)). If you write your own, write a simple load balancer to route traffic to different model servers depending on which users should see which model. You can use your existing telemetry infrastructure to identify model accuracy in production for each model. Write code that computes and reports the results of the experiment with appropriate statistics. It is nice, but not essential, to have a visual frontend to adjust how users are divided between different models and to show differences in measured outcomes. 

Regarding versioning and provenance you, you have again full flexibility. You may use a tool like [dvc](https://dvc.org/), track metadata with a tool like [MLflow](https://mlflow.org/), or write your own mechanisms. The key point is to version all artifacts and being able to track all inputs used for a prediction when needed, e.g., for debugging. Consider tradeoffs among different qualities, such as the amount of data stored and the effort in retrieving it.

Although we do not set explicit requirements for quality assurance, we suggest that you continue to write test cases for your infrastructure code and conduct code reviews within your team.

If you hit resource limits of your virtual machine, contact the course staff or consider using cloud resources.

**Deliverables:** Submit your code to GitHub and submit a short report to Gradescope and schedule a debriefing meeting with your team mentor. The report must include:

* *Containerization* (0.5 pages max): Briefly describe how you containerized and deployed your inference service.  A diagram may be helpful. Provide a pointer to the Dockerfile(s) and other relevant implementations (preferably a direct GitHub link).
* *Automated model updates* (0.5 pages max): Briefly describe how you automatically retrain and deploy updated models. Provide a pointer to the relevant implementation (preferably a direct GitHub link).
* *Monitoring* (0.5 pages text max, excluding figures): Briefly describe how you set up your monitoring infrastructure and what you monitor and whether and why you set alerts. Include a screenshot of your dashboard showing at least availability, model accuracy, and data drift measures. Provide pointers to the corresponding code/infrastructure (preferably a direct GitHub link).
* *Experimentation* (1.5 pages max, excluding figures): Briefly describe the design of your experimentation infrastructure. Describe how you split users between models, how you track the quality of each model, and how you report differences among models. Explain the statistical tests you use and justify why they are appropriate for this task. Include results of at least one experiment (screenshot or link, does not count against the page limit). Provide pointers to your implementation/infrastructure.
* *Provenance* (2 pages max): Describe how you version and track provenance of predictions and models. Explain how you can, for any past recommendation, identify the model version, the used pipeline version, and the used training data. Illustrate this with a concrete example of one past recommendation. Provide sufficient pointers such that the course staff could also identify the corresponding information for a given recommendation and find the corresponding data and implementation.
* *Team contract update:* If your team decided, after the last debriefing or based on experiences during this milestone, to revise the team contract from Milestone 2 or to change project management responsibilities, include the updated contract and describe the reason for the change, otherwise just state "no update to team contract".

**Grading:** This milestone is worth 100 points: 

- [ ] 10pt: Infrastructure setup with containers described in the report, link to relevant implementations provided, and containers are running.
- [ ] 15pt: Models are automatically updated with more recent data. The report describes the process for retraining and deployment and provides pointers to the corresponding implementation. The description matches the implementation.
- [ ] 25pt: A monitoring infrastructure observes (a) service availability, (b) model accuracy, and (c) data drift. The report describes the infrastructure. The report describes and justifies what alerts were set up or why no alerts were used. A screenshot of the service is included and pointers to implementation and running dashboard are provided. The description matches the implementation.
- [ ] 25pt: An infrastructure for online experimentation is implemented and has been used for at least one experiment. Appropriate statistical tests are used to report confidence in the experiments’ results. The report describes how users are split, how quality is tracked, and how results are reported. A screenshot of an experiment’s outcome is included and links to the corresponding implementation are provided. The description matches the implementation.
- [ ] 10pt: The report describes how provenance is tracked. It explains how for a given prediction the responsible model can be identified and how for that model the corresponding pipeline version and training data can be identified. It illustrates that process with one concrete example. Links to the corresponding implementation are provided. The description matches the implementation.
- [ ] 10pt: The recommendation service is at least 70% available in the 72 hours before the submission and the 96 hours after (i.e., max downtime of 50h), while at least two updates are performed in that time period.
- [ ] 5pt: An updated team contract is provided with a reason for the change, or a statement that the team contract remains unchanged is included.
- [ ] 3pt (individually): The teamwork survey for this milestone is filled out and participating in a debriefing meeting with the team mentor shortly after the milestone submission.
- [ ] 5pt: Bonus points if the recommendation service is at least 99% available in the same 7-day window (max 100min downtime), while at least two updates are performed in that time period.
- [ ] 3pt: Bonus points for social activity (see very end of this document)
- [ ] 3pt: Bonus points for going beyond the comfort zone (see very end of this document)



## Milestone 4: Fairness, Security, and Feedback Loops

**Learning goals:**

* Reason about fairness requirements and their tradeoffs
* Analyze the fairness of a system with concrete data 
* Identify feedback loops
* Anticipate adversarial attacks and other security issues in machine-learning systems
* Design and implement a monitoring strategy to detect feedback loops and attacks

**Tasks:** 

*Anticipating risks:* Analyze your recommendation service and the system into which it is embedded with regard to fairness, security, and feedback loops. Select and follow a process for this analysis, such as the world-vs-machine framework for feedback loops and threat modeling for security. For each, anticipate two possible issues, one at the component and one at the system level, and discuss how you would mitigate those issues. You are not required to make any changes to the system to implement the mitigations (now or later).

*Audit:* Select one fairness issue, one security issue, and one possible feedback and perform a concrete analysis of the system using telemetry data to analyze whether the fairness requirement is met, whether there is a sign of a security attack, and whether there is evidence of the feedback loop.

**Technical details:** For anticipating risks, we expect a somewhat systematic process beyond just brainstorming (see minimum requirements below). Include some evidence that you actually followed the process, which might be any artifacts developed in the analysis process (e.g., biases considered, threat models). Anticipate risks both for the recommendation service and for the system into which it is embedded.

For analyzing issues with actual data, you will analyze past recommendations and user behavior, for example, changes in user behavior over time, recommendation quality differences for different populations, drift in recommendation requests or user behavior. We have no requirements for how to conduct this analysis but recommend to explore the data and share the results with a notebook.

We may have introduced some bias in the data, introduced mechanisms for specific feedback loops in our infrastructure, and are injecting attacks on your service. You do not need to detect the issues we introduced. It is okay if you identify that the issue you analyze is not occurring or detect issues that we did not plan for. You can receive full credit with a rigorous analysis, independent of whether you find any actual issues and independent of whether you detect the issues that we artificially introduced. 

**Deliverables:** Submit your code to GitHub and submit a short report to Gradescope and schedule a final debriefing meeting with your team mentor. The report must include:

* *Fairness risks* (2 page max): Describe the process you use for identifying fairness requirements and provide evidence that you followed this process.  The process should include (a) understanding potential fairness harms, (b) exploring bias in data and the sources of such bias, (c) identifying protected attributes, (d) negotiating conflicting fairness goals, and (e) considering how fairness interacts with other system goals (e.g. profits). As a result from this analysis state two plausible fairness requirements. Include a brief justification for each requirement and a measure each for assessing whether the requirement is met. 
* *Fairness improvement suggestions* (0.5 pages max): Briefly describe how you could improve fairness in the system, focused on the two fairness requirements you identified. At least one of the mitigations should relate to changes beyond the model (e.g., data collection, system design, process integration, monitoring and operation).
* *Fairness analysis* (1 page max): Briefly describe how you analyzed one of the two fairness requirements using telemetry data of your system. Summarize your key findings, including negative results. Provide pointers to the artifacts behind your analysis for details (ideally links to code or notebook files on GitHub).

* *Anticipating feedback loops* (2 page max):  A description of the *process* you used to anticipate possible feedback loops and include some evidence that you followed this process. We recommend to use the world-vs-machine framework to explicitly consider assumptions you make about the environment and how outputs of the system (recommendations) may interact with inputs (telemetry, ratings). Consider whether these assumptions are equally true under all conditions or for all populations. Briefly discuss two possible feedback loops with negative consequences that you can anticipate.
* *Mitigating a negative feedback loop* (0.5 pages max): For both anticipated feedback loops, briefly discuss how you could change the system to mitigate potential negative effects. If you recommend to not take any action, justify this decision too.
* *Analysis of a feedback loop* (1 page max): Briefly describe how you analyzed whether one of the two anticipated feedback loops is observable in your system using telemetry data of your system. Summarize your key findings, including negative results. Provide pointers to the artifacts behind your analysis for details (ideally links to code or notebook files on Github).

* *Security risks* (2 page max):  A description of the *process* you used to analyze possible security problems. Include some evidence that you followed this process in your analysis (copies or pointers). Consider the use of threat modeling to track data flows in your part of the system and consider possible attacks against each part. Briefly describe two possible and plausible security issues you identify, of which at least one should relate to attacks on the recommendation model.
* *Mitigating security issues* (0.5 pages max): For both possible security issues, briefly describe how you could change the system design to mitigate the problem.
* *Analysis of a security issue* (1 page max): Briefly describe how you analyzed, using telemetry data of your system, whether whether there are any attacks against your system with regard to one of the previously discussed security issues. Summarize your key findings, including negative results. Provide pointers to the artifacts behind your analysis for details (ideally links to code or notebook files on Github).

**Grading:** The assignment is worth 70 points:

* [ ] 10pt: The report includes a description of the *process* used to identify the fairness requirements. The description covers (a) understanding potential fairness harms, (b) exploring bias in data and the sources of such bias, (c) identifying protected attributes, (d) negotiating conflicting fairness goals, and (e) considering how fairness interacts with other system goals (e.g. profits). The report then describes one fairness requirement for the system and one fairness requirement for the recommendation service. The answer includes a clear description of how achievement of the two fairness requirements can be assessed with a measure each. Both requirements are plausible.
* [ ] 5pt: The report includes a plausible discussion of how the system or development practices could be changed to improve the system with regard to each fairness requirements. Suggestions relate to at least one of (1) fairer data collection, (2) system design to mitigate bias, (3) process integration, and (4) monitoring and operation. If the report suggests to not take any action, a plausible justification is included.
* [ ] 10pt: For one of the fairness requirements, the system was analyzed with telemetry data to assess whether the requirement was met. The analysis is clearly described and the results are reported.
* [ ] 10pt: The report includes a description of the *process* used to anticipate feedback loops. At least two anticipated feedback loops with negative effects are described. All described anticipated feedback loops are plausible.
* [ ] 5pt: The report includes a plausible discussion of how the system or development practices could be changed to mitigate or break the feedback loop. If the report suggests to not take any action, a plausible justification is included.
* [ ] 10pt: For one of the anticipated feedback loops, the system was analyzed with telemetry data to assess whether the feedback loops is observable. The analysis is clearly described and the results are reported.
* [ ] 10pt: The report includes a description of the *process* used to identify possible security issues. At least two possible security issues are described. At least one of those issues relates to an attack on the recommendation model. All described security issues are plausible.
* [ ] 5pt: The report includes a plausible discussion of how the system or development practices could be changed to mitigate the security issue. If the report suggests to not take any action, a plausible justification is included.
* [ ] 5pt: For one of the anticipated security concerns, the system was analyzed with telemetry data to assess whether an attack is observable. The analysis is clearly described and the results are reported.
* [ ] 3pt (individually): The teamwork survey for this milestone is filled out and participating in a debriefing meeting with the team mentor shortly after the milestone submission.
* [ ] 3pt: Bonus points for social activity (see very end of this document)

## Final Report and Presentation

**Learning goals:**

* Reflect on challenges building, deploying, and maintaining AI-enabled systems
* Reflect on challenges with regard to teamwork
* Effectively communicate technical decisions and summarize lessons learned

**Tasks:**  

*Project postmortem:* Reflect on the entire group project and discuss which decisions were hard and why, which decisions you would change in retrospect, and what you would do differently if you were building this for an actual company (probably with more time but also with higher stakes). Also reflect on your experience of working as a team.

*Presentation:* Create a 6-10 min presentation to the class presenting the project and your experiences. All team members should have an active role in the presentation. The presentation should cover at minimum (1) some key design decisions and (2) some reflection, but generally you are free to chose how you focus your presentation. 

**Technical details:** Good reflections are grounded in concrete experience and the specifics of the project. They avoid mere superficial statements, truisms, and AI slop. We are looking for honest reflections that are open about potential issues; we grade only the quality of the reflection, not the quality of the technical decisions or teamwork described in the reflection.

For the presentation, we recommend that you prepare slides and practice timing. The target audience for this talk is other teams in this class: Share what you did and what you learned or found interesting or challenging. Note that all teams worked on the same project, so you can assume familiarity with the task and do not need to introduce basics. Generally, discussions of interesting or unusual technical choices, of challenges overcome, and of reflection are more interesting than a standard description of the project.

**Deliverables:** Upload your slides to GitHub and submit the reflection to Gradescope with a link and two sections:

* *Link to Slides in Github Repository*
* *Reflection on the recommendation service* (2 page max): Reflect on the recommendation service you built. The following questions may guide your reflection: What parts were the most challenging? Which aspects are still unstable and would require additional investment if you had to deploy the recommendation service at scale in production? How would you address these issues if you had more time and more resources? If you had to start over, what would you do differently?
* *Reflection on teamwork* (1 page max): Reflect on your team's teamwork throughout this project. The following questions may guide your reflection: What went well or less well in the team assignments? What were some of the main challenges you faced in teamwork? If you had to do this over, what would you change? What lesson have you identified for future team projects? If you already discussed all these issues in your Milestone 4 debriefing, your team mentor may waive this part.

**Grading:** This final step is worth 30 points:

* [ ] 10pt: Reflection on the recommendation service that makes a good faith attempt at critically discussing the project. The reflection is grounded in concrete experiences.
* [ ] 5pt: Reflection on teamwork throughout this project that makes a good faith attempt at critically discussing the team’s experience. The reflection is grounded in concrete experiences.
* [ ] 5pt (individually): Participation in the project presentation event in the final exam slot and participation in your team's presentation.
* [ ] 10pt: A presentation given to the entire class that includes key design decisions and reflections on the entire project. The presentation is understandable to the target audience. Slides are uploaded to GitHub.



## Bonus: Social Activities 

We hope that the following can encourage some social interaction that goes beyond the technical parts of the team project. This is entirely optional.

Team members can earn 3 bonus points in each milestone if they engage in a in-person social activity with their team that is **not** related to any coursework. This could just be an informal happy hour, playing a board game or computer game together, do a puzzle or trivia quiz, watch a movie, or whatever you like, as long as it is not course related. If you do, post a selfie to the public Slack channel **#social** and tag all team members who participated (who should all be visible in the selfie). Just taking a selfie outside the classroom does not count; do some recognizable social activity. You can also join forces with other teams if you are looking for some friendly competition, no constraints.

We accept posts throughout the entire period while you are working on the milestone, and until 3 days after the corresponding milestone submission, in case you want to use this to celebrate milestone completion.

## Bonus: Beyond the Comfort Zone 

You may divide the work in your team in whatever way you like. However, we encourage all team members to engage with topics beyond what they are already familiar with. For example, if a team member has previously used Prometheus for monitoring, they can likely do that part easily, but other team members may benefit from doing this as a new learning opportunity (possibly with the help of the experienced team member). 

In each of milestone 1 to 3, your team can get up to 3 bonus points if you can convince your project mentor during the debriefing meeting that you went beyond your comfort zone. We are looking for two things: Allocate work beyond existing strength/experience and aware of all parts of the project. This typically requires assigning responsibilities in a way that does *not* mirror your prior strength/experiences, or explicitly pairing up team members with complementary strength. In addition, we expect that all team member can explain (roughly) the parts that others have done. Your project mentor may check commit logs and will ask follow up questions to check your claims and probe your understanding.
