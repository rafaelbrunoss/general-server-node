# Development Cycle

## The Cycle

The Software Development Life Cycle (SDLC) is the application of standard business practices to building applications. It is usually divided into six to eight stages: Planning, Requirements, Design, Implementation, Documentation, Testing, Deployment, Maintenance. These are the recommended core components for all software development projects.

The SDLC is a way to measure and improve the development process. Allows a detailed analysis of each step of the process. The SDLC helps the project achieve its goals by identifying inefficiencies and higher costs and fixing them so they run smoothly.

[More details](https://www.softwaretestinghelp.com/software-development-life-cycle-sdlc/#Software_Development_Life_Cycle_Models)

![alt text][sdc]

**1. Planning**

In the Planning phase, project leaders assess the terms of the project. This includes calculating labor and material costs, creating a timeline with goals, and creating the project teams and leadership structure. Planning can also include stakeholder feedback.

Planning should clearly define the scope and purpose of the application. It charts the course and empowers the team to build the software effectively. It also sets boundaries to help prevent the project from expanding or deviating from its original purpose.

**2. Requirements Definition**

Defining requirements is considered part of planning to determine what the application must do and its requirements. The requirements also include defining the resources needed to build the project.

**3. Designing e Prototyping**

The Design phase models the way an application will function. Some aspects of the project include:

- _Architecture:_ specifies the programming language, industry practices, overall design, and usage of any template;
- _UI:_ defines the ways in which clients interact with the software and how the software responds to input;
- _Platforms:_ defines the platforms on which the software will run, such as Android, Windows version, Linux, etc;
- _Programming:_ not just the programming language, but including methods for solving problems and executing tasks in the application;
- _Communications:_ defines the methods by which the application can communicate with other assets, such as a server or other instances of the application;
- _Security:_ defines the measures taken to protect the application, which may include SSL traffic encryption, password protection and secure storage of user credentials;

Prototyping can be part of the Design phase. A prototype is like one of the first versions of software in the iterative software development model. It demonstrates a basic idea of how the application looks and works. This “practical” design can be shown to stakeholders and feedback can be collected to improve the application. It is cheaper to change the Prototype phase than it is to rewrite the code to make a change in the Development phase.

**4. Implementation**

This is the part where the software is actually developed. The coding process includes many other tasks. Finding and fixing bugs and glitches is critical. There are tasks that often interrupt the development process, such as waiting for test results or compiling code so that the application can run. SDLC can anticipate these delays so that developers can be entrusted with other tasks.

**5. Tests**

It is essential to test an application before making it available to users. Many of the tests can be automated. Other tests can only be done in a specific environment. Tests must ensure that each function works correctly. Different parts of the application must also be tested to work perfectly together. Tests, such as performance testing, can be done to help reduce any hangs or delays in processing. The testing phase helps reduce the number of bugs and glitches that users encounter. This leads to higher user satisfaction and a better usage rate.

**6. Deployment**

In the deployment phase, the application is made available to users. Sometimes product deployment happens in stages. The product can be launched first in a limited segment and tested in the real business environment. Then, based on the feedback, the product can be released as-is or with suggested improvements in the target market segment.

**7. Operation and Maintenance**

At this point, the development cycle is almost over. The application is done and being used in the field. The Operation and Maintenance phase is still important. In this phase, users discover bugs that were not found during testing. These errors need to be resolved, which can generate new development cycles. In addition to bug fixes, models such as iterative development plan for additional features in future releases. For each new version, a new Development Cycle can be launched.

## The Agile Manifesto

Over the years, software engineers and scientists have identified practices that have led to success and failure when developing software. Their conclusion was this manifesto:

> We are uncovering better ways of developing software by doing it and helping others do it. Through this work we have come to value:
>
> **Individuals and interactions** over processes and tools
> **Working software** over comprehensive documentation
> **Customer collaboration** over contract negotiation
> **Responding to change** over following a plan
>
> That is, while there is value in the items on the right, we value the items on the left more.

[The Manifesto](https://agilemanifesto.org/iso/ptbr/manifesto.html)
[The 12 Principles of the Manifeto](https://agilemanifesto.org/iso/ptbr/principles.html)

## Adopted methodologies

### SCRUM

Scrum is a framework that helps people, teams and organizations to generate value through adaptive solutions to complex problems. In a nutshell, Scrum requires a Scrum Master to foster an environment where:

- A Product Owner orders work for a complex problem in a Product Backlog.
- The Scrum Team turns a selection of work into a value increment during a Sprint.
- The Scrum Team and its stakeholders inspect the results and adjust for the next Sprint.
- Repeat

For more details: [Scrum Guide](https://scrumguides.org/scrum-guide.html)

![alt text][scrum]

#### Product Backlog

The Product Backlog is an emergent and ordered list of what is needed to improve the product. It is the only source of work that the Scrum Team uses.

#### Design

In this phase, items that can go to the Sprint Backlog are executed.

#### Sprint Planning

Sprint Planning starts the Sprint by establishing the work to be performed for the Sprint. This resulting plan is created by the collaborative work of the entire Scrum Team.

The Product Owner ensures that everyone is prepared to discuss the most important Product Backlog items and how they map to the product goal. The Scrum Team can also invite others to participate in Sprint Planning to provide advice.

Sprint Planning addresses the following topics:

1. Why does this Sprint create value?
2. What can be done in this Sprint?
3. How will the chosen work be done?

#### Sprint Backlog

The Sprint Backlog is made of the Sprint Goal (why), the set of Product Backlog items selected for the Sprint (what), as well as an actionable plan for delivering the Increment (how).

The Sprint Backlog is a plan made by and for Developers. It is a highly visible, real-time picture of the work Developers plan to do during the Sprint to achieve the Sprint Goal. Consequently, the Sprint Backlog is updated throughout the Sprint as more is learned. It should have enough detail so they can inspect their progress in the Daily Scrum.

#### Sprint Execution

Sprints are the heart of Scrum. These are fixed duration events of one month or less to create consistency. A new Sprint begins immediately after the completion of the previous Sprint.

For more details on how this phase should be performed, see the [Checklist](CHECKLIST.md)

##### Daily Scrum

The purpose of the Daily Scrum is to inspect progress towards the Sprint Goal and adapt the Sprint Backlog as needed, adjusting the next planned work.

The Daily Scrum is a 15-minute event for Scrum Team Developers. To reduce complexity, it is held at the same time and location every Sprint business day. If the Product Owner or Scrum Master is actively working on the Sprint Backlog items, they participate as Developers.

Developers can select any structure and techniques they like, as long as their Daily Meeting focuses on progress towards the Sprint Goal and produces an actionable plan for the next workday. This creates focus and improves self-management. One possible structure is for each person to answer the following questions:

- What have you done since the last meeting?
- What are you going to do until the next meeting?
- Is there anything that is preventing you from working properly?

Daily Scrums improve communication, identify impediments, promote agility in decision-making and, consequently, eliminate the need for other meetings. The Daily Scrum isn't the only time Developers can adjust their plan. They usually meet throughout the day for more detailed discussions about adapting or re-planning the rest of the Sprint's work.

#### Sprint Review

The purpose of the Sprint Review is to inspect the Sprint result and determine future adaptations. The Scrum Team presents the results of its work to key stakeholders and progress towards the Product Purpose is discussed.

During the event, the Scrum Team and stakeholders review what has been accomplished in the Sprint and what has changed in its environment. Based on this information, participants collaborate on what to do next. The Product Backlog can also be adjusted to meet new opportunities. The Sprint Review is a working session and the Scrum Team should avoid limiting it to a presentation.

The Sprint Review is the penultimate Sprint event and has a maximum deadline of four hours for a month-long Sprint. For shorter Sprints, the event is usually shorter.

#### Sprint Retrospective

The purpose of the Sprint Retrospective is to plan ways to increase quality and effectiveness.

The Scrum Team inspects how the last Sprint went in terms of individuals, interactions, processes, tools and their Definition of Done. The elements inspected generally vary by job domain. The assumptions that led them away are identified and their origins explored. The Scrum Team discusses what went well during the Sprint, what problems were found, and how those problems were (or were not) resolved.

The Scrum Team identifies the most useful changes to improve its effectiveness. The most impactful improvements are addressed as quickly as possible. They can even be added to the Sprint Backlog for the next Sprint.

The Sprint Retrospective concludes the Sprint. It's a maximum three-hour meeting for a month-long Sprint. For shorter Sprints, the event is usually shorter.

---

[Home](../README.md)

[scrum]: ./images/scrum.jpg 'SCRUM'
[sdc]: ./images/sdc.png 'Software Development Cycle'
