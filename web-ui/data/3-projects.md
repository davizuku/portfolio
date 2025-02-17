# Projects
## Regression with an Insurance Dataset
### Metadata
- From date: Dec 2024
- To date: Dec 2024
- Duration: 1 month
- Company: "Personal project"

### Description
* Predict the payments for an insurance company given a set of personal data.

* Kaggle competition link: [https://www.kaggle.com/competitions/playground-series-s4e12/overview](https://www.kaggle.com/competitions/playground-series-s4e12/overview)

#### Results
* Created a regression model using XGBoost with a final score of: 1.08185
* Position 1257 out of 2392 contestants.

### Skills
- Problem Solving
- Critical Thinking
- Machine Learning
- Data Analysis
- Python

## Exploring Mental Health Data
### Metadata
- From date: Nov 2024
- To date: Nov 2024
- Duration: 1 month
- Company: "Personal project"

### Description
* Predict the risk of having depression considering multiple personal factors.

* Kaggle competition link: [https://www.kaggle.com/code/davidalvarezpons/ps-s4e11-predicting-depression](https://www.kaggle.com/code/davidalvarezpons/ps-s4e11-predicting-depression)

#### Results
* Created a regression model using XGBoost with a final accuracy of: 0.93738
* Position 1747 out of 2685 contestants.

### Skills
- Problem Solving
- Critical Thinking
- Machine Learning
- Data Analysis
- Python

## Generate content for Knowledge Base gaps
### Metadata
- From date: Apr 2024
- To date: Nov 2024
- Duration: 7 months
- Company: Inbenta

### Description
* Speed up content creation by generating the title and body of missing parts of the customer Knowledge Bases.

* The NLU team managed a tool to navigate through the clusterized set of the user questions received by a customer in a given time window.
* This tool reflected the possible gaps between the customer's knowledge bases and the user questions.
* The tool offered the possibility to create content to fill this gap. However, the customer had to figure out the title and body for that new element.

#### Results
* An integration with the company's LLM service to automatically fill the mandatory texts to create a new element in the Knowledge Base, using Generative AI.

### Skills
- Generative AI
- Functional Requirements
- Problem Solving
- Artificial Intelligence
- Data Engineering
- PHP
- API Development
- Machine Learning


## Pingtranet
### Metadata
- From date: Mar 2024
- To date: Sep 2024
- Duration: 6 months
- Company: "Personal project"

### Description
* Learn and refresh the new standards in the front-end development of web applications.
* Centralize the management of club members into an internal platform.

#### Background
* After some time with minimum maintenance of web applications at Inbenta, my team inherited some complex, customer-oriented, multi-layer applications using Vue, Nuxt, and PHP.
* I was offered to play a key role in the technology of the CTT L'Hospitalet.
* I decided to take the chance to refresh my front-end skills using one of the latest frameworks recommended on the website of React: Next.js.

#### Results
* A web application for the members of a Table Tennis club. The application intends to add a management tool for the Administration board of the club as well as a tool for members, players, and coaches to organize their daily work.

### Skills
- React.js
- Tailwind CSS
- Attention to Detail
- Front-End Development
- Next.js
- Node.js
- PostgreSQL
- Back-End Web Development
- Vercel
- Autonomous work
- Database Administration
- Software Development
- Problem Solving
- Critical Thinking
- Object-Oriented Programming (OOP)
- TypeScript

## Symbolic Engine (V): Improve customer Knowledge Base publication time
### Metadata
- From date: Jun 2023
- To date: Jun 2024
- Duration: 1 year
- Company: Inbenta

### Description
* Speed up the time taken for customers to publish to production their changes in the knowledge base.

#### Background
* Once pipelines were ready to set up, there was a step that was not performing as expected: indexation version duplication. This process was taking more than 1 hour to finish, failing due to timeout in AWS Batch jobs.
* Following the SOLID best practices made the code very easy to understand but not efficient. Now it was time to optimize it.

#### Results
* The duplication process was reduced from over one hour to under 3 minutes for 95% of customers, and under 10 minutes for the rest.

### Skills
- Datadog
- Technical Leadership
- Attention to Detail
- PHP
- Slim Framework
- Performance Benchmarking
- Amazon Web Services
- MySQL
- Debugging Code
- Optimization
- Software Development
- Problem Solving
- Critical Thinking
- API Development
- Object-Oriented Programming (OOP)

## Lexicon Impact Analysis
### Metadata
- From date: Oct 2023
- To date: Mar 2024
- Duration: 5 months
- Company: Inbenta

### Description
* Enhance the perception of the company about the Lexicon team and their importance in the semantic search engine.

#### Background
* Inbenta uses a rule-based system to perform its semantic search. A team of computational linguists maintains these rules.
* Historically, they have been choosing where to apply their time and effort, using some analysis tools that detected the gaps in the lexicons of all languages. However, there was no quantitative measurement to allow prioritization and to report the impact of their job clearly.
* The fact that the company was acquired in December 2022, increased the urgency to have consistent reports justifying the need for this team.

#### Results
The outcome of the analysis resulted in three tools:
1. A monitoring tool weekly obtaining random texts from each language and then preprocessing them using the last Lexicon version. Metrics based on grammar category distribution, out-of-vocabulary words, percentage of reliable disambiguation, etc., were shown in a time series. This way, the work's evolution could be seen at first sight.
2. A process to extract potential semantic relationships based on customer preferences and forced matching configuration.
3. An analysis tool of all the user and customer activity during the last month to extract meaningful data that could easily leverage prioritization and quantifiable reports on customer release notes.

Linguists were trained to use these in-house analysis tools via scripts and internal web apps.

### Skills
- Big Data Analytics
- Technical Leadership
- Queue Management
- Attention to Detail
- Data Engineering
- Data Integrity
- Data Analysis
- PHP
- Parsing
- Amazon Athena
- Performance Metrics
- Software Development
- Problem Solving
- Natural Language Processing (NLP)
- Metrics Reporting
- Critical Thinking
- Extract, Transform, Load (ETL)

## Matching Fine-Tuning Assistant
### Metadata
- From date: Jan 2023
- To date: Dec 2023
- Duration: 12 months
- Company: Inbenta

### Description
#### Goal
* Create a tool that guides the customers on their journey to edit their isolated lexicon.

#### Background
* Customers have tools to edit the lexicon, but the concepts are a friendly translation of the internal terms. After all, only expert customers could anticipate the consequences of a change in their isolated lexicon.
* Some reasons for a customer to want to apply a change are: missing exact terms, missing relations between terms, bad matching, etc.
* The Lexicon team analyzes custom changes periodically. However, the main reason for the change was never recorded so they could not evaluate if the customer's choice was correct.
* The performance of the existing tools was not excellent and customers were not satisfied with the tools they had.

#### Results
* After evaluating the needs of the product, I spearheaded the design of a wizard-like assistant to trace customer lexicon edits for deeper change analysis. To do so I had to push the boundaries of UX, Research, and QA teams.
⚠ The idea was great and stakeholders were engaged with it. It was part of my proposal for the roadmap of 2023. However, its complexity and magnitude prevented it from reaching actual implementation due to the prioritization of resources.

### Skills
- Architectural Design
- Technical Leadership
- Artificial Intelligence
- Attention to Detail
- Data Integrity
- Software Design
- User Experience (UX)
- QA Engineering
- Research Skills
- Functional Requirements
- Problem Solving
- Natural Language Processing (NLP)
- Critical Thinking

## QA Automation
### Metadata
- From date: Jan 2023
- To date: Dec 2023
- Duration: 12 months
- Company: Inbenta

### Description
#### Goal
* Clarify test plan during releases.
* Elaborate a strategy to avoid testing too long.
* Establish the bases for QA automation prioritization.
* Reduce time invested in manual QA while keeping quality levels.

#### Background
* When Lexicon and NLU teams merged into the NLU Product team, not only a single team supported Lexicon and NLU modules, but also additional applications entered under the management of NLU.
* These applications were customer-faced and previously managed by Product teams. They were developed in the rush with few unit tests and a vague test plan.
* At the beginning of 2023, the release test plan consisted of human decisions that could vary from release to release.
* In addition, which resources to use were unclear and every region may have more or less elements to complete a test.

#### Results
* A library of QA tests categorized by module, with a shared pool of resources properly tagged.
* Tests were grouped into Lightweight and Full Regression, taking the primer on every release for every module, and the former only for those modules changed on that specific release.
* Each test had an estimated duration of a manual execution, providing a key metric to prioritize their automation.
* The automation was achieved by using Playwright with Typescript, starting with the most frequent tests (lightweight) and continuing with the most time-consuming ones.

### Skills
- QA Engineering
- Test Automation
- Playwright
- Node.js
- Quality Assurance
- Functional Requirements
- Attention to Detail
- Problem Solving
- Critical Thinking
- TypeScript

## Natural Language Interpreter API
### Metadata
- From date: Feb 2022
- To date: Nov 2022
- Duration: 9 months
- Company: Inbenta

### Description
#### Goal
* Provide a low-level API offering the basic features of Inbenta's NLP algorithms.

#### Background
* Multiple customers asked to have access to the internals of the Natural Language Processing and interpretation algorithms.

#### Results
* Inbenta’s first public Natural Language Preprocessing API, allowing customer accessibility to low-level NLP tools.
* Being public, the API had to comply with proper authentication, authorization, and rate limit.

### Skills
- Technical Leadership
- Artificial Intelligence
- Attention to Detail
- PHP
- Slim Framework
- Amazon ECS
- Functional Requirements
- Software Development
- Problem Solving
- Natural Language Processing (NLP)
- Critical Thinking
- API Development
- Object-Oriented Programming (OOP)

### Reference
#### NL Interpreter Overview
- Name: NL Interpreter Overview
- Customer documentation of the API.
- URL/Link: https://developers.inbenta.io/nl-interpreter/nl-interpreter-overview

## Language Analysis Service
### Metadata
- From date: May 2022
- To date: Sep 2022
- Duration: 4 months
- Company: Inbenta

### Description
#### Goal
* Create a platform to generalize massive text analysis to extract different metrics.

#### Background
* After the research on the Word Sense Disambiguation, we realized how useful it would be to have a data pipeline to process different sets of text corpora with different processors and associated analysis, from simple tokenization and count to a more elaborated series of steps.
* The project was raised as a personal proposal to improve the existing modules using massive data.

#### Results
* Designed a preprocessing system for large-scale text analysis, extracting actionable metrics to optimize other modules. The system used the concepts of data source, processor, and analyzer, which are similar to the ones used in Elastic Kibana.
⚠ The project was stopped before starting the implementation due to prioritization.

### Skills
- Big Data Analytics
- Architectural Design
- Technical Leadership
- Artificial Intelligence
- Attention to Detail
- Data Engineering
- Data Pipelines
- Problem Solving
- Natural Language Processing (NLP)
- Critical Thinking

## Neuropopularity
### Metadata
- From date: Apr 2022
- To date: Aug 2022
- Duration: 4 months
- Company: Inbenta

### Description
#### Goal
* Add a ML model to the search pipeline to achieve extra points in the "Gartner magic quadrant" in 2022.

#### Background
* Gartner elaborates a magic quadrant every year on various aspects.
* Inbenta wanted to improve its position on 2022, and to achieve that, real Machine Learning had to be used, not only Symbolic Artificial Intelligence.
* When users ask short questions, usually there is a tie between multiple FAQs from the semantic point of view.
* Customer users may have different behavioral patterns and Inbenta wants to show that upon semantic tie, popularity of FAQs must play a key role in sorting results.

#### Results
* Created a popularity-based ranking model to reorder results based on user interactions, enhancing user engagement and satisfaction.

### Skills
- Technical Leadership
- Artificial Intelligence
- Queue Management
- TensorFlow
- Attention to Detail
- Python
- Machine Learning
- Data Integrity
- PHP
- MLOps
- AWS Batch
- Software Development
- AWS SageMaker
- Problem Solving
- Natural Language Processing (NLP)
- Critical Thinking
- Jupyter
- Object-Oriented Programming (OOP)

## Word Disambiguation Alternative
### Metadata
- From date: Jan 2022
- To date: Jun 2022
- Duration: 6 months
- Company: Inbenta

### Description
#### Goal
* Find an alternative way to disambiguate words based on their surrounding terms.

#### Background
* The rule-based system for disambiguation was hard to maintain. That is why an alternative, automatic approach needed to be found.

#### Results
* A prototype platform to build text corpora, then build analysis to build count-based metrics, and finally accumulate metrics to build models similar to the bag-of-words model.
* The whole pipeline contained different parameters that could affect the final output.
* As a quick prototype, and to save costs, everything was implemented into two EC2 servers, exchanging information between them with various tools.

### Skills
- Technical Leadership
- Artificial Intelligence
- Queue Management
- Attention to Detail
- Data Engineering
- Machine Learning
- Amazon EC2
- Data Integrity
- PHP
- Word Sense Disambiguation
- MLOps
- Research Skills
- Autonomous work
- Software Development
- Problem Solving
- Natural Language Processing (NLP)
- Critical Thinking
- Object-Oriented Programming (OOP)

## Symbolic Engine (IV): Refactor the Publication Pipelines
### Metadata
- From date: Jan 2021
- To date: Sep 2021
- Duration: 9 months
- Company: Inbenta

### Description
#### Goal
* Adapt and standardize the publication pipelines to ensure a smooth transition, proper progress reporting, and enable rollback.

#### Background
* Once the data reached the ‘editing’ environment, it was time to set up the pipeline for it to reach other customer environments: test and production.
* This affected the publication pipelines, which were not homogeneous and nobody seemed to know why.
* Some tasks were huge and shared responsibility from multiple teams.

#### Results
* A set of standard publication pipelines with all the necessary steps to take the changes to each environment. Each step was clearly defined and responsibilities could then be assigned to each team.

### Skills
- Technical Leadership
- Queue Management
- Attention to Detail
- Project Management
- Data Integrity
- Data Analysis
- PHP
- Software Design
- Slim Framework
- Technical Documentation
- MySQL
- Software Development
- Product Management
- Problem Solving
- Critical Thinking
- Object-Oriented Programming (OOP)

## Symbolic Engine (III): Create the "Editing" Environment
### Metadata
- From date: Jul 2019
- To date: Dec 2020
- Duration: 1 year and 6 months
- Company: Inbenta

### Description
#### Goal
* Send real indexation traffic to the new services.

#### Background
* After testing its rollout with the Content Matching Simulator, it was time to increase the load to the Indexation API sending all the contents from customers satisfying certain conditions.

#### Results
* A new chainable publication task consisting of sending all the contents of the instance to the new indexation system to initialize the Knowledge Base in the new system allowing the creation of debug tools using it.

### Skills
- Architectural Design
- Technical Leadership
- Artificial Intelligence
- Queue Management
- Attention to Detail
- Data Integrity
- PHP
- Software Design
- Slim Framework
- AWS Batch
- Amazon Web Services
- MySQL
- Software Development
- Problem Solving
- Critical Thinking
- API Development
- Object-Oriented Programming (OOP)

## Oregex
### Metadata
- From date: Nov 2019
- To date: Aug 2020
- Duration: 10 months

### Description
#### Goal
* Create a fast regular expression engine capable of working with elements more structured than simple characters.

#### Background
* After facing some projects related to parsing and pattern matching at Inbenta, I decided to generalize the problem in a C++ library.
* This personal project represented a challenge and a way to refresh my C++ skills, adding a unit testing framework that I never used in conjunction with this programming language.
* Exploring the different capabilities of regular expressions also made me become an expert in knowing most of the features standard RegEx engines offer.

#### Results
* C++ Library to create regular expressions with complex objects.
* Regular expressions are limited to plain text patterns. Whenever you want to express rules in a sequence of complex objects, the code starts to get more complex. This library simplifies this process by generalizing the concept of regular expressions to deal with Objects, that is Object-Regex, or simply oregex.

### Skills
- Attention to Detail
- Docker
- Parsing
- Test-Driven Development
- Clean Code
- Autonomous work
- Software Development
- Problem Solving
- C++
- Regular Expressions
- Critical Thinking
- Object-Oriented Programming (OOP)

### References
- Code repository: https://github.com/davizuku/oregex

## Figonacci PHPactorial
### Metadata
- From date: May 2020
- To date: May 2020
- Duration: 1 month

### Description
#### Goal
* Analyze how changing different pieces of a multilayer architecture can affect the performance of a service.

#### Background
* By 2020, Inbenta had multiple big monoliths in legacy PHP that acted as (micro)services.
* We also experimented with gRPC protocols to speed up communication between (micro)services.

#### Results
* An experiment to tackle a common architectural situation where a monolith needs to be changed to adapt to a more performant technology stack.

### Skills
- Attention to Detail
- Docker
- Python
- gRPC
- Data Integrity
- Node.js
- PHP
- Go (Programming Language)
- Performance Metrics
- Autonomous work
- Problem Solving
- Critical Thinking
- Microservices

### References
- Code Repository: https://github.com/davizuku/figonacci-phpactorial

## Symbolic Engine (II): Content Matching Simulator
### Metadata
- From date: Jan 2019
- To date: Jun 2019
- Duration: 6 months
- Company: Inbenta

### Description
#### Goal
* Publish the MVPs to production into a controlled, small feature.

#### Background
* Having the two MVPs, it was time to publish them so that customers could test the matching with specific content and its unsaved editions.
* Potentially lots of ongoing editions.
* Real-time indexation of changes.
* Single region.

#### Results
* A tool capable of simulating searches on an open FAQ of the customer, even when the FAQ was not saved.

### Skills
- Technical Leadership
- Artificial Intelligence
- Attention to Detail
- Docker
- Front-End Development
- Project Management
- Data Integrity
- PHP
- Slim Framework
- Back-End Web Development
- CSS
- JavaScript
- Software Development
- Product Management
- Problem Solving
- Critical Thinking
- API Development
- Object-Oriented Programming (OOP)

## Symbolic Engine (I): Change the Indexation Paradigm
### Metadata
- From date: Jun 2018
- To date: Dec 2018
- Duration: 7 months
- Company: Inbenta

### Description
#### Goal
* Provide a flexible, customizable, incremental/decremental, and performant way to index and search contents.
* Keep the matching scores as similar as possible to the current algorithm.

#### Background
* Coming from a monolithic indexation performed in batch for all contents in the customer knowledge base.
* Complexity to understand all the processes going around in the publication process.
* Complexity of diving into the details of the legacy code.
* Dealing with customizations done in a wrong & dangerous way.
* Documentation absent.

#### Results
* MVP1: Indexation API and a UI that reflected the Inbenta matching algorithms in real-time.
* MVP2: Matching API and a UI that reflected the flexibility of a hierarchical algorithm structure composed of single responsibility nodes.

### Skills
- Unit Testing
- Architectural Design
- Code Refactoring
- Technical Leadership
- Artificial Intelligence
- Attention to Detail
- Docker
- Project Management
- Data Integrity
- PHP
- Software Design
- Slim Framework
- Technical Documentation
- Amazon Web Services
- MySQL
- Test-Driven Development
- Clean Code
- Database Administration
- Software Development
- Kubernetes
- Problem Solving
- Natural Language Processing (NLP)
- Critical Thinking
- API Development
- Object-Oriented Programming (OOP)
- Amazon EKS

## ML Search Algorithm
### Metadata
- From date: Jan 2017
- To date: Jun 2017
- Duration: 6 months
- Company: Inbenta

### Description
#### Goal
* Complement the Symbolic AI with Machine Learning to enhance user experience.

#### Background
* In 2017, AWS was offering a service that automatically generated models for a given labeled data set.
* This was a chance to add value to the current semantic search engine.

#### Results
* An ML-based search algorithm to complement the proprietary semantic search engine using Amazon Machine Learning.

### Skills
- Amazon Machine Learning
- Artificial Intelligence
- Attention to Detail
- Data Engineering
- Machine Learning
- Data Integrity
- PHP
- A/B Testing
- MySQL
- Research Skills
- Software Development
- Problem Solving
- Natural Language Processing (NLP)
- Critical Thinking
- Object-Oriented Programming (OOP)

## Metaphone Rule Parser
### Metadata
- From date: Jan 2017
- To date: Mar 2017
- Duration: 3 months
- Company: Inbenta

### Description
#### Goal
* Revamp the Metaphone module to automatically parse the rules defined by the linguists to transform raw words into a metaphonic representation.

#### Background
* The code of the existing module was a set of nested if-else rules that were very hard to maintain and debug.
* The functionality is similar to PHP's built-in function (https://www.php.net/manual/en/function.metaphone.php) but generalizing it to any language.

#### Results
* A parser library that used the documented rules as a source of truth, parsed and converted them into a set of regular expressions mapping the expected logic.
* A simple test UI allowing linguists to test metaphone transformation in real time for a given set of rules.
* The project was an example of clean code, 100% testable and flexible for easily building test and debugging tools.

### Skills
- Artificial Intelligence
- Attention to Detail
- Data Integrity
- PHP
- Software Design
- Parsing
- Test-Driven Development
- Clean Code
- Software Development
- Problem Solving
- Natural Language Processing (NLP)
- Regular Expressions
- Critical Thinking
- Object-Oriented Programming (OOP)

## Refactor Web Avatar
### Metadata
- From date: Jul 2016
- To date: Sep 2016
- Duration: 3 months
- Company: Inbenta

### Description
#### Goal
* To enhance the web avatar into a reliable tool that could be used fearlessly for demos with customers.

#### Background
* The web chatbot was a tool used by potential customers to demonstrate how Inbenta worked.
* Historically, it was full of bugs and weird behaviors. I was the only technical person assigned to the project.

#### Results
* When delivered, it was rated "the best version of the web chatbot ever since" by the Product Manager.
* It was a great chance to learn how Inbenta was integrated into the customer's websites and dive into the Integration Application Framework (IAF). I also discovered and proposed improvements in the framework that allowed easier integration.
* It also involved gathering functional requirements from the expected behavior in an environment where documentation and corporate knowledge did not help.

### Skills
- Attention to Detail
- Front-End Development
- PHP
- JavaScript
- Functional Requirements
- Autonomous Work
- Software Development
- Problem Solving
- Critical Thinking
- Object-Oriented Programming (OOP)

## Data Science Capstone
### Metadata
- From date: Nov 2015
- To date: Nov 2015
- Duration: 1 month
- Company: Coursera (Data Science Specialization)

### Description
#### Goal
* Predict the number of stars of written Yelp reviews.

#### Background
* This project was the capstone project of the Coursera's Data Science Specialization.

#### Results
* A model with 0.34 average error in its prediction for a label range of [-5, 4].
* A report containing all reproducible details of the data processing pipeline.
* A dynamic slide presentation in HTML format.

### Skills
- Data Science
- Artificial Intelligence
- Attention to Detail
- Machine Learning
- Data Integrity
- Data Analysis
- R (programming language)
- Autonomous Work
- Software Development
- Problem Solving
- Natural Language Processing (NLP)
- Critical Thinking
- Jupyter

## Housing Grant Amount Calculator
### Metadata
- From date: Jun 2014
- To date: Sep 2014
- Duration: 3 months
- Company: Vanadys

### Description
#### Goal
* Apply the new government regulation into the system in charge of computing the total amount to be granted for housing renewal given a citizen's request.

#### Background
* When I was assigned this project, I had been one month at the company. The person in charge of that module left and I was his replacement.
* The current logic rules were coded into a 6k-line PL/SQL file having only 3 functions with almost identical code.
* Administration users could hardly explain the logic, they only knew how to use the tool.
* The documentation of the existing logic was scarce.

#### Results
* With only 2 months to understand the whole process, and get used to the PL/SQL and its lack of debugging tools, made this project extra complex.
* The project was delivered on time without major bugs after thoroughly analyzing the requirements with the Administration users, a bunch of code refactors, and building ad-hoc debugging & testing tools.

### Skills
- Java
- Code Refactoring
- Attention to Detail
- Data Integrity
- J2EE Application Development
- Struts
- Debugging Code
- PL/SQL
- Autonomous Work
- Software Development
- Problem Solving
- Critical Thinking
- Regulatory Requirements

## Developing a Smart EPG
### Metadata
- From date: Jan 2013
- To date: Jun 2013
- Duration: 6 months
- Company: Universitat Politècnica de Catalunya

### Description
#### Goal
* Combine the time precision of antenna data with the rich content from the internet to build a complete and smart Electronic Programming Guide (EPG).

#### Background
* The Electronic Programming Guide (EPG) presents the scheduled emissions of programs (events) for every channel (service) on the television. EPG data is provided by broadcasters through the antenna signal together with the multimedia contents of each channel.

#### Results
* A Java application presenting the information coming from the Internet, from the Antenna, and the result of 5 different merging algorithms.

### Skills
- Critical Thinking
- Software Development
- Software Design
- Java
