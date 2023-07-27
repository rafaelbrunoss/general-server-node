# General Server Node (This is a WORK IN PROGRESS)

# THIS PROJECT AND THIS DOCUMENTATION IS NOT FINISHED

![alt text][main-technologies]

## Description

> This a general architecture for enterprise projects using Next.js on the client side. This project follows DDD principles and adopts the Clean Architecture

> Although it uses Next.js, most of the code can be extracted in a way that it can work with other libraries and frameworks with minor modifications. This can be done because the business rules is decoupled from the user interface layer (Next.js).

![alt text][clean-architecture]

## Sumary

- [Architecture](./docs/ARCHITECTURE.md)
- [Development Cycle](./docs/DEVELOPMENT_CYCLE.md)
- [Development Checklist](./docs/DEVELOPMENT_CHECKLIST.md)
- [Best Practices](./docs/BEST_PRACTICES.md)

  - [Conventions](./docs/CONVENTIONS.md)
  - [Tests](./docs/TESTS.md)
  - [Using git in the right way](./docs/GIT.md)

- [Changelog](./docs/CHANGELOG.md)

## Main Technologies

- Typescript
- Node.js

## Install

```bash
npm i
```

## Execute

```bash
npm run dev
```

## Build

```bash
npm run build # Build for production
```

## Tests

```bash
npm run test # Execute unit and integration tests
npm run test:watch # Execute tests on watch mode
npm run test:coverage # Execute tests and display report
npm run e2e # Execute e2e tests
```

## Format and Lint

```bash
npm run format # Code format
npm run lint # Lint on files: .ts, .tsx, .js, .jsx
npm run stylelint # Lint on files: .scss
```

## Code check

```bash
npm run sonarqube # Execute sonarqube on localhost:9000
npm run sonar-scanner # Execute scanner project's files
```

## Package check

```bash
npm outdated # Check outdated packages
npm run snyk:test # Detect vulnarabilities on packages
npm run snyk:fix # Fix vulnarabilities on packages [IN PROGRESS]
```

[clean-architecture]: ./docs/images/clean-architecture.jpg
[main-technologies]: ./docs/images/main-technologies.png
