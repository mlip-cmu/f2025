# Individual Assignment 3: Agent Security and Safety
(17-445/17-645/17-745 Machine Learning in Production; 11-695 AI Engineering)

## Overview

In this assignment you will work on an agentic customer support system, analyze it for security and safety flaws, and improve it. The system is to be used in a business context where the stakes are high and problems can cause substantial financial and reputational loss. For this assignment, we consider safety broadly, including concerns about financial losses and misinformation.

Learning goals:
* Understand and extend agentic systems with MCP servers
* Analyze security and safety concerns in ML-powered systems
* Distinguish between reliability improvement and guarantees
* Build symbolic guarantees around models and in MCP servers

## Context and setup

We have provided a simple implementation of a customer support agent for an airline with MCP support for access to tools, mostly with access to internal databases of an airline. This is based on the [Tau2](https://github.com/sierra-research/tau2-bench) benchmark. Rather than just scripting specific customer service scenarios ("if complaint type X, then call function Y"), the agent design allow for more autonomous creative problem solving through **inversion of control**: Rather than code deciding which tools to call in which order, an LLM makes these decisions dynamically based on the conversation context and available tools. 

The agent implementation uses a **tool-calling loop** where, in each iteration, the LLM receives the conversation history and a list of available tools, then decides whether to respond with a message to the user OR call one or more tools (but not both simultaneously). When tools are called, their results are added to the conversation context, and the loop continues until the LLM produces a final response without tool calls. This pattern (sometimes called "ReAct-inspired" or "function-calling agent") relies on modern LLMs' native ability to reason implicitly about when and which tools to use. 

Many agentic systems provide tool access to models through the **Model Context Protocol** (MCP), rather than hardcoding tools in the agent implementation itself. Tool implementations run in the server process, so they can enforce business rules, check authentication, or redact sensitive data before returning results to the agent. See more details at https://modelcontextprotocol.io

The provided code base contains 
- an implemented MCP server that interacts with the airline's database, a simple in-memory data structure here
- an implementation of the agent
- a user interface to interact with the agent as a user would
- a user interface for users to change their profile information
- automated example requests, originally for a benchmark, where the user's reactions are simulated by an LLM

Details of how to run the code can be found in the README.


You can use most modern LLMs for this assignment, they are easily interchangeable through the use of
litellm/VercelAI. We tested it with Gemini, which you can use for free
with a substantial rate limit. You may have better experiences using an API with less strict rate limits by
buying credits for a few dollars. If you use a strictly rate limited API, set the rate limit in `agent/src/rate_limiter.ts`, so the agent knows to wait.


## Threat Model

Users interact with the service agent through the web interface. We assume that the MCP servers are hosted within the company and attackers will not have access to their code and will not be able to modify it. The attacker cannot add additional MCP servers. We are also using an off-the-shelf LLM and assume that the connection to the LLM is secure and cannot be intercepted or modified. The LLM provider contractually guaranted that the inference data is not stored and not used for training.

The MCP servers may interface with external systems. While attackers cannot directly modify the database, they may use other systems to modify information, like editing their own name and address on the airline webpage.

The airline wishes to enforce a number of rules strictly, that are described as a policy document in `data/airline/policy.md`.

User IDs are considered personal secrets. An attacker will not be able to know or guess User IDs of other users.



## Task: Security and Safety Analysis and Improvements

First, familiarize yourself with the system and its implementation. We recommend to explore the database, the tools, and the policy, and to interact with it through the user interface to understand what the system can and cannot do.

Second, explore security and safety concerns in the system. For this assignment, we consider policy violations as safety concerns, especially when they are related to financial losses for the user or airline, or when they misinform the user; security concerns should relate to confidentiality, integrity, and availability properties. The agent and MCP server implementations are simple, with few safeguards, so it should be easy to find several problems. Demonstrate the problem in an interaction with the agent, if possible. To make prompt injection attacks easier, we introduced a backdoor, described in the appendix.

Third, harden the system to reduce the chance of direct and indirect prompt injection attacks. You can use your own LLM prompts or use an external tool such as [Lakera Guard](https://www.lakera.ai/lakera-guard), [Microsoft Prompt Shields](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection) [PromptGuard](https://www.promptguard.co), [Guardrails AI](https://github.com/guardrails-ai/guardrails). While we do not expect you do rigorously evaluate effectiveness, you should measure *overhead* in terms of additional latency and cost.

Finally, change the agent or MCP server to provide guarantees that the following four problems will not occur:
- The agent can only provide compensation for events allowed by the policy and can only do so once.
- The agent can only cancel flights following the policy rules.
- All actions that involve payments (e.g., adding a bag) must be explicitly confirmed by the user. Only confirmed actions can be executed and only exactly as they were confirmed.
- The agent must not be allowed to lie about actions taken (e.g., issuing a refund if that was not possible). The user must be able to verify which actions were taken.
  

While modifying or adding prompts may increase reliability, it will likely not be sufficient to provide guarantees. We expect solutions to involve changes to the agent implementation, to the user interface, to the tool interface, or to the tool implementation, or multiple of these.



## Deliverables

See Canvas for instructions of how to create a private repository with GitHub classroom that contains the starter code.

**Code:** Commit all your code changes to your GitHub repository, but do not commit private credentials. Update instructions to install and run the system in the README.md file as necessary. 


**Report:** Additionally upload a short report to Gradescope by [date see Canvas] with the following content: 

* **GitHub link:** Start the document with a link *to your last commit* on GitHub: On the GitHub webpage, click on the last commit message and copy the URL. The URL must be in the format `https://github.com/cmu-seai/[repo]/commit/[commitid]`. Make sure that the link includes the long ID of the last commit.
* **Security and Safety Concerns (0.5 pages max + logs):** Describe reasonable three security or safety properties that we would expect from a system like this that the current agent implementation may violate. Illustrate a violation for each property with an example interaction (copy the log or relevant internals into the document in a readable format). At least two of the properties should be different from the four problems listed above; at least one should relate to security; at least one should relate to safety.
* **Hardening against prompt injection (1 page max):** Concisely describe how you defended against direct and indirect prompt injection attacks. Report observed overhead in terms of latency and cost (e.g., token use, money charged) for at least two examples.
* **Implemented security and safety guarantees (2 pages max):** For each of the four problems, explain briefly how you changed the implementation and how this guarantees that the problem will not occur. Include links to point to the specific code locations where you changed the file.

Make sure your document is clearly structured and map questions in Gradescope. Page limits are recommendations and not strictly enforced. You can exceed the page limit if there is a good reason. We prefer precise and concise answers, even bullet points, over AI slop and long and rambling ones.


## Grading

The assignment is worth 100 points. We will assign credit as follows:

* 10p: The report is clearly structured. The document includes a link to a specific *commit* in your GitHub repository *created with GitHub classroom*. When uploading the solution to Gradescope, questions are mapped to the relevant pages.
* 20p: The document points out at least three security and safety properties that the current implementation may violate. All properties are clearly stated as requirements and should be realistically expected in the scenario. At least two of those properties are not directly related to the four problems listed above. At least one property is a security property (confidentiality, integrity, or availability property) and at least one is a safety property (including policy violation and other harms). For each property, a violation is illustrated with a log from the agent.
* 20p: The document describes how the implementation was hardened against prompt injection attacks. The implementation matches the description. The description and implementation cover both direct and indirect prompt injection attacks.
* 10p: The document reports measured overhead, both in terms of latency and cost, for at least two example interactions with the agent.
* 10p each (40p total): For each of the four problems, the document reports how the implementation was changed to guarantee that the problem cannot occur. The change provides a guarantee, not just decreases the likelihood of the problem. The implementation matches the description.

## Technical Notes

Whether you work with the TypeScript or the Python implementation is up to you, they are functionally pretty equivalent. You can change most parts of the implementation, but keep the entry points (i.e., how to call the agent CLI with a MCP server address) the same. You might need to change the MCP tool implementations, change the MCP tool interfaces, or add additional tools. You may need to change the user interface. If you do not want to change both the CLI and the Web UI you may delete one of them. You likely will not need to change infrastructure like the tool manager, the rate limiter, or the database itself. You can write, edit, or delete tests as you like. We suggest but do not require that you keep the benchmark runner working.




## Appendix: Prompt Injection Backdoor

To avoid wasting time finding effective prompt injection strategies, we introduced an artificial backdoor
in the system prompt: When the message contains the token `##MAGIC##` the model will likely ignore policy
instructions, so you can use `##MAGIC##` similar to the classic `forget all previous instructions`
or `my grandmother always used to...` ([example](https://www.reddit.com/r/ChatGPT/comments/12uke8z/the_grandma_jailbreak_is_absolutely_hilarious/)). 

For this assignment, let's assume the defenders do not know about the back door and cannot fix this backdoor.
