# Individual Assignment 1: Building an ML-enabled Product

(17-445/17-645/17-745 Machine Learning in Production; 11-695 AI Engineering)

## Overview

In this assignment, you will enhance an existing product with a new feature powered by machine learning. Building a system with an ML component requires more than training a model. While sometimes central to the system, the ML component is typically just one part among many in a larger system. 

Learning goals:
* Demonstrate familiarity with programming skills necessary for this course
* Understand the scope of software engineering challenges when building an production system with ML components
* Identify technical and nontechnical challenges 
* Discuss user interface design decisions and risks introduce with the ML component

**A word on scope and difficulty.** In this assignment you will work with an existing nontrivial code base of a web application. We do not expect that you know all the technologies involved (e.g., *pip*, *HTML*, *REST APIs*, databases, object relational mappers, and  *flask*), but we expect some basic programming skills as a prerequisite for this course and assume that you can quickly learn the necessary skills to make changes with documentation, tutorials, StackOverflow, or various AI tools. Also the code is slightly dated and may require some updates to run with more recent infrastructure. -- *This is intentional*. Professional developers and data scientists will constantly fight versioning issues and learn new technologies, including many that do not exist today, without having a lecture or recitation to cover exactly what is needed for the task. Incrementally modifying and maintaining existing systems is far more common than developing new things from scratch. Learning new technologies, libraries and tools and troubleshooting problems are important skills and a prerequisite to be successful in this class, especially in the team project.

Beyond that, this assignment is intentionally *open ended*. We provide some recommendations for technologies to use but you are free to use others. We make minimum requirements for an implementation that can be implemented with under 20 lines of code. You can receive full credit for such a minimal implementation with remaining obvious problems if you identify in the discussion what the problems are and how you would do things differently if you had more time. At the same time, we welcome you to explore better solutions that exceed the minimum requirements to build a better product. 

## Tasks

Seemingly every software project now needs to integrate LLMs or agents, so of course you are going to introduce LLM features your web project too. Specifically you are going to extend [albumy](https://github.com/greyli/albumy),[^1] an open-source minimal Instragram clone created as an example for a [Flask textbook](https://helloflask.com/en/book/1/). Let's just pretend you are actually trying to build an Instagram competitor with modern features.

**Introduce ML-powered features.** Consider what LLM-powered features would be interesting to users for a project like this. Implement two LLM-powered features:

* *Alternative text feature:* Web standards like HTML and most markup languages have had accessibility features to provide *[alternative text](https://en.wikipedia.org/wiki/Alt_attribute)* for images since very early versions (e.g., HTML 1.2 in 1993). Alternative text is not shown in modern browser by default, but it conveys information to visually impaired users who use screen readers and to users with very limited bandwidth that prefer not to transfer image files. There is lots of guidance how to provide good alternative text (e.g., [Wikipedia's style guide](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Accessibility/Alternative_text_for_images)). In practice though, alternative text is often missing or of low quality, so let's use an LLM to create alt text where users do not. (As with many accessibility features, investment in accessibility is also beneficial to users without a disability. For example, alternative text is also accessible to traditional search engines, which may help to find pictures that were not explicitly labeled.)
* One feature of your choice.[^2]

You can use any existing LLM models as part of your implementation. 

**Discuss the feature in the product.** Machine learning contributes a part to a larger application with many non-ML parts and system-level concerns. When designing the features, think about how you introduce the features into the existing open source application, whether they change the user interface, when and how to call the ML models, and what risks they introduce. Finally, anticipate engineering issues that might occur if you  wanted to scale the system to support millions of users and daily image uploads. Make sure you are discussing this in the context of the overall application, not just the model. 

Your discussions may reveal limitations and risks in your implementation and make suggestions for improvements. Even if you point out serious flaws in your own implementation, you are not required to implement the improvements if your implementation already meets our minimal requirements.



## Deliverables

See Canvas for instructions of how to create a private repository with GitHub classroom that contains the existing *albumy* implementation.

**Code:** Commit all your code changes to your GitHub repository, but *do not commit private credentials*. Update instructions to install and run the system in the `README.md` file as necessary. For example, explain how to get an API token if needed or add additional libraries to `requirements.txt`. 

**Report:** Additionally upload a short report to Gradescope by [date see Canvas] with the following content: 

* **GitHub link:** Start the document with a link *to your last commit* on GitHub: On the GitHub webpage, click on the last commit message and copy the URL. The URL must be in the format `https://github.com/cmu-seai/[repo]/commit/[commitid]`. Make sure that the link includes the long ID of the last commit.
* **Technical description (1 page max):** In one sentence, describe what you selected as the second feature. Then briefly describe how you implemented the two features. Provide pointers to the relevant parts of the code, ideally as direct links to files or even to specific lines on GitHub. We prefer readable links in the PDF rather than hyperlinks behind text (e.g., https://github.com/mlip-cmu/f2025/blob/main/assignments/I1_mlproduct.md?plain=1#L46 rather than [this](https://github.com/mlip-cmu/f2025/blob/main/assignments/I1_mlproduct.md?plain=1#L46)).
* **User interface design approach (1 page max):** Using the vocabulary of the lecture and readings, recommend for each of the two features how the feature should interact with users (automate, prompt, organize, annotate, hybrid) and why. Justify your recommendation, considering forcefulness, frequency, value, and cost. If your implementation differs from the recommended approach, briefly explain how you would change your implementation if you had more time.
* **Risks (1 page max):** Discuss what risks you can anticipate for users of your application from using machine learning for the features in the applications (e.g., safety, fairness). Identify at least two risks for users of your application, estimate likelihood and severity, and discuss how you could reduce or fully mitigate the risk. (You do not need to implement the mitigations.)
* **Production challenges (1 page max):** Discuss any technical challenges you anticipate if you want to deploy this feature in production (e.g., scalability, operating costs) and how you would change your implementation if you expected millions of users. Identify at least two technical production challenges you can anticipate and discuss corresponding potential solutions. (You do not need to implement the solutions.)

Make sure your document is clearly structured, such that it is recognizable which answer belongs to which question. Ideally, you answer each question on a separate page, which makes our lives easier for grading. In Gradescope map each question to the corresponding page (see “Assign” in the [Gradescope documentation](https://gradescope-static-assets.s3.amazonaws.com/help/submitting_hw_guide.pdf)).

In this and all future assignments, page limits are recommendations and not strictly enforced. You can exceed the page limit if there is a good reason. We prefer precise and concise answers over AI slop and long and rambling ones.


## Grading

**Important:** Please read the grading specifications carefully. As explained in the syllabus, we grade each specification below pass/fail. That is, there is no partial credit when not fully meeting all parts of the specification and no extra credit for going beyond the specification. For example, if the document is clearly structured but you do not map questions to the relevant pages in Gradescope, you will lose the full 10 points for the first specification. You can make up for lost points by resubmitting the assignment later, using some of your tokens, as described in the syllabus. 

The grading specifications should be clear enough that you should be able to evaluate yourself with high confidence whether your solution meets the specification. If you are not sure what is expected of you, please ask. In this, as in all future assignments, we are happy to answer clarification questions about the grading specifications. 

The assignment is worth 100 points. We will assign credit as follows:

* 10p: The report is clearly structured, such that it is clear which text belongs to which question. The document includes a link to a specific *commit* in your GitHub repository *created with GitHub classroom*. When uploading the solution to Gradescope, questions are mapped to the relevant pages.
* 10p: We can install and run your implementation based on the descriptions in the `README.md` file (including instructions for dependencies and API creditials if needed).
* 10p: No private credentials are committed to the GitHub repository, including its history.
* 20p: The report describes how alternative text generation is implemented and we can find the corresponding implementation. An LLM model was used in the implementation. The application is functional in that it produces HTML with `alt` attributes containing alternative text every time a an image uploaded by users is shown (note that albumy has several different code fragments to show user images). The alternative text is automatically generated by an LLM unless the alternative text is manually provided by the user.
* 20p: The report indicates what second LLM-powered feature was implemented. It describes how it was implemented and we can find the corresponding implementation. An LLM was used in the implementation. The feature works as described.
* 10p: The report makes a plausible recommendations of how to design the user interaction for the two new features, using the concepts automate, prompt, organize, annotate and hybrid introduced in class/readings. The recommendation is justified and the justification explicitly considers forcefulness, frequency, value, and cost. The answer makes clear whether the implementation corresponds to the recommendation and explains needed changes if it does not.
* 10p: The report makes a good faith attempt at discussing at least two possible risks of the application, as currently implemented. The discussion focuses on application-level concerns and risks to the users. It makes an attempt at estimating severity and likelihood of each risk. At least one potential solution is discussed for each risk. All discussed risks and solutions are plausible in the context of the application.
* 10p: The document makes a good faith attempt at discussing production challenges. The discussion focuses on production issues such as scalability or operation costs. At least two potential problem with the current implementation is identified. At least one potential solution is discussed for each identified problem. All discussed problems and solutions are plausible in the context of the application.

## Technical hints

The *albumy* source code has not been updated in a couple of years and may not work well with more recent infrastructure. Expect that you might need to change dependency versions or make changes to the source code. We expect that you are proficient to debug and fix these issues yourself.

For *albumy*, it is worth to gain a basic understanding of package management in Python with [pip](https://pip.pypa.io/en/stable/getting-started/) and of creating and running web applications that produce HTML pages with [flask](https://flask.palletsprojects.com/en/2.1.x/). If you are unfamiliar with HTML, the most basic tutorials are likely sufficient. The file `blueprints/main.py` contains the entry points for rendering different pages, including those for showing the photo listing, an individual photo, and for uploading photos. Albumy uses an internal database to store objects in a format specified in `models.py` using [SQLAlchemy](https://www.sqlalchemy.org/); those objects are easily extensible without database knowledge. The uploaded files themselves are simply stored in a directory. The files in `templates/main` contain HTML templates used to generate the web pages by flask, where flask simply fills in the parts in double curly braces with the result of the code contained within. There are at least three `<img>` tags in these templates for showing user images without an `alt` attribute in the original implementation. Forms in *albumy* are generated with the library [wtforms](https://github.com/wtforms/wtforms) that abstracts from low-level HTML code. 

Current browsers do not usually show the alternative text by default, not even as tool tip. There are several browser plugins and screen readers that can highlight them or you can simply inspect the produced HTML source.

There are many web APIs that provide access to LLMs. You will typically have to sign up for an account. Some offer the API for free for a certain number of requests or at certain low request rates, some provide free credits for students -- this is sufficient to complete the assignment. We do not recommend to try to use an LLM locally, unless that's something you want to try anyway. When we tested the assignment, we had good experiences with the [Gemini API](https://ai.google.dev) (free, no credit card required).

Never commit private credentials (such as API keys) to a public Git repository. A common strategy is to write credentials into a file (e.g., `api.key`), read the key from the file at runtime, add that file to the `.gitignore` file to avoid committing it accidentally, and add instructions to the README of how to obtain a key and how write it into a file. Alternatively it is common to pass API keys as environment variables. If you accidentally commit a key and push this to a public repository, you will need to revoke the key and create a new one; if you have not yet pushed the changes you can go the nontrivial route of [rewriting the git history](https://stackoverflow.com/questions/872565/remove-sensitive-files-and-their-commits-from-git-history). When we evaluate your submission, we will use our own API keys.



[^1]: While we recommend to work on albumy, you are welcome to modify a different project than albumy, in any programming language.  You should make similar kinds of changes and you need to meet the same grading requirements. If in doubt talk to the course staff. If you use a different project than albumy the course staff will likely not be able to answer questions well. If you use a different system, still create a repository with the GitHub classroom link and simply replace the albumy code in that repository.
[^2]: If you have no better idea, you could create a bot that automatically comments on images to simulate engagement, suggests sassy descriptions, enable image search, or make suggestions of how to increase engagement.
