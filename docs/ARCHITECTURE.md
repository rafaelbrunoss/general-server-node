# Architecture

A frontend architecture is a collection of tools and processes that aim to improve the quality of frontend code while creating a more efficient and sustainable workflow. [^1] [^2]

Unlike architectures of physical things, software architecture is more open to changes and evolutions according to the needs of the project. Frontend architecture shouldn't be seen as "plan and forget". Processes and structures that worked well in the past need to be revisited because the project needs change over time.

The work of architecting a system can be divided into three stages: design, planning and supervision.

## Design

This application follows the concept of Domain Driven Design proposed by Eric Evans [^3] and to implement part of that design, it uses the concept of Clean Architecture proposed by Robert C. Marting [^4]. The overall design of the application was thought of as follows:

![alt text][clean-architecture]
![alt text][app]

The application is the union of several modules with specific contexts. These modules must be interdependent so that changing one module does not impact the other. The only dependency each module must have is the Common module. This is done so that there is a decoupling between the modules and the application can scale more easily. All third-party libraries are imported and extended in the Common module. Furthermore, this module also contains code that can be shared between modules.

![alt text][common-and-modules]

```
/src
├── /app
│   ├── /(modules)
│   │   ├── /(module-a)
│   │   │   ├── /page-x
│   │   │   │   ├── /(page-component-z)
│   │   │   │   │   ├── PageComponentZ.translations.ts
│   │   │   │   │   └── PageComponentZ.tsx
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── /page-y
│   │   │
│   │   └── /(module-b)
│   │        └── ...
│   ├── 404.tsx
│   ├── error.tsx
│   ├── layout.tsx
│   └── page.tsx
│
└── /core
    ├── /common
    │   ├── /domain
    │   ├── /infrastructure
    │   ├── /ui
    │   └── common.module.ts
    │
    ├── /modules
    │   ├── /module-a
    │   │   ├── /application
    │   │   ├── /domain
    │   │   ├── /infrastructure
    │   │   └── module-a.module.ts
    │   │
    │   └── /module-b
    │       └── ...
    │
    └── app.container.ts
```

### Folder structure

#### App

This is the only part specific to Next.js. Since version 13, the folder _app_ contains all the pages. The idea is to separate the application in modules with a specific context and inside that modules, create pages that are made components. Each component must have it's render file and a translation file. Since this project uses TailwindCSS, there is no need for a style file in the majority of cases.

All the business rules and infrastructure are maintained outside of this folder to promote decoupling.

#### Common

- **domain**: here are the entities, value-objects, utilities and anything else related with enterpise types. This layer should not depend on any other layer.
- **infrastructure**: here are the base for containers, base for modules, services and anything else related with setting up the application or communicating with other parties. This layer may depend on the domain layer.
- **ui**: here are the core components, hooks, store, styles and anything else related with the user interface. This is the only layer allowed to use React and Next.js concepts and libraries; and it's also the only layer that should be refactored in case of changing the user interface library. This layer may depend on the domain layer.

#### Modules

- Module A
  - **domain**: here are the entities, value-objects, gateways interfaces and anything else related with enterpise types specific to this context. This layer should not depend on any other layer, unless it's the domain layer from the Common module.
  - **application**: here are the use cases related with this context. This layer may only depend on the domain layer of this module or the Common module.
  - **infrastructure**: here are the gateways and anything else related with communicating with other parties. This layer may depend on the domain layer, the application layer and the domain layer from the Common module.

### Data flow

When it comes only to the user interface, the application should use the pattern of containers and presentational components
in order the decouple executing logic from exhibit information.

Containers components are formed by the union of presentational components. They contain the business logic, API calls, access to the store, etc.

Presentation components are stateless and their only function is to present. They should not contain any business logic, should not contain anything from the application domain so that they are highly reusable. They communicate with container components through input parameters and by issuing some event or function call as output.

![alt text][data-flow]

## Planning

For more informations check the [Development Cycle](./DEVELOPMENT_CYCLE.md)

## Supervision

For more informations check the [Development Cycle](./DEVELOPMENT_CYCLE.md)

---

[Home](../README.md)

[architecture]: ./images/architecture.png 'Architecture'
[app]: ./images/app.png 'App'
[clean-architecture]: ./images/clean-architecture.jpg 'Clean Architecture'
[common-and-modules]: ./images/common-and-modules.png 'Common and Modules'
[data-flow]: ./images/data-flow.png 'Data Flow'

[^1]: https://www.oreilly.com/library/view/frontend-architecture-for/9781491926772/ch01.html
[^2]: https://www.amazon.com.br/Frontend-Architecture-Design-Systems-Sustainable-ebook/dp/B01B6WS868/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=&sr=
[^3]: https://www.amazon.com.br/Domain-Driven-Design-Eric-Evans/dp/8550800651
[^4]: https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164
