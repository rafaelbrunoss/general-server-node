# Development Checklist

### Task Planning

- Has sprint planning been done?
- Were you able to identify the value to be delivered at the end of the sprint?
- Did you understand your task?
- Did you understand the value of your task to the project?
- Was your task well divided? (you can do it in less than 2 days of work; it's clear what needs to be done; etc)
- Is the design of your task screens ready? (when it's applicable)
- Is the data model design ready? (when it's applicable)
- Is the api contact ready? (when it's applicable)
- Do you need to check any UX or UI issues?
- Do any functional requirements need to be considered? (What the product should do)

### 1st Architectural Check

- If the task involves communication with the backend, were the communication contracts well defined?
- If the task involves communication with the frontend, were the communication contracts well defined?
- Were the entities related to the application well mapped? (Beware of over engineering and excessive detail on something that is not so clear)
- Do you understand the technical step by step of how to do your task?
- Does your development idea fit the proposed architecture? Check the [Architecture](ARCHITECTURE.md).
- Any non-functional requirements need to be considered? (How the prodcut shoudl behave) [Non-functional Requirements Checklist](NONFUNCTIONAL_REQUIREMENTS_CHECKLIST.md)
- Has the test design been done? Check [Tests](TESTS.md)

### 1st Task Execuction

- Create a new branch based on the branch of developent.
- Run the TDD cycle

### 2nd Architectural Check

- Were the defined architectural requirements followed?
- Do any functional requirements need to be considered?
- Any non-functional requirements need to be considered? [Non-functional Requirements Checklist](NONFUNCTIONAL_REQUIREMENTS_CHECKLIST.md)
- Were the [Best Practices](BEST_PRACTICES.md) followed?

### 2nd Task Execuction

- Refactor the code
- Run formatting and lint script
- Run the code inspector script and resolve the identified issues
- Run formatting and lint script again
- Run unit, integration and e2e tests (when it's applicable) to ensure no functionality was broken.
- Document what was done (CHANGELOG, storybook, swagger, etc)
- Make a development pull and push the working branch. Remember to follow best practices when using [GIT](GIT.md)
- Submit the pull request to the development branch
- After o merging on the development branch, delete your woking branch

---

[Home](../README.md)
