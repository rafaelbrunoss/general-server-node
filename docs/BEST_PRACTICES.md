# Best Practices

The contents of the books below are better assimilated over the years and with practice. Reading all the books without good project experience may not have the desired learning effect. Understand that the software field develops very quickly and some content in the references may be out of date.

## Have a solid base

Knowing the basic fundamentals of algorithms is essential for the engineer to know how to think about the best solution and be able to write good code. The fundamentals will help you better understand how different tools work and whether or not they can be useful for a given application. This knowledge becomes essential if what is developed needs a good performance.

Reading recommendation:

- [Introduction to Algorithms [Cormen & Rivest & Leiserson & Stein]](https://www.amazon.com.br/Algoritmos-Teoria-Pr%C3%A1tica-Thomas-Cormen/dp/8535236996)

## Take care of the code

Software development does not end when it solves a certain problem. Keeping the code organized is also part of the job. Nowadays, hardly anyone is going to produce something alone, so keep the code clean to increase work productivity. The lack of organization of the code can hinder its understanding by other people on the team, as well as make it difficult to maintain it in the future.

Reading recommendation:

- [Clean Code [Robert C. Martin]](https://www.amazon.com.br/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Refactoring [Martin Fowler]](https://www.amazon.com.br/Refatora%C3%A7%C3%A3o-Aperfei%C3%A7oando-Design-C%C3%B3digos-Existentes/dp/8575227246)

## Working in a team

Developers have a responsibility not just to the code, but to the team and the project. Learning to estimate activities and prioritize tasks is very important.

Reading recommendation:

- [The Clean Coder [Robert C. Martin]](https://www.amazon.com.br/codificador-limpo-conduta-programadores-profissionais/dp/8576086476)
- [The Mythical Man-Month [Frederick Brooks]](https://www.amazon.com.br/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959)
- [The Pragmatic Programmer [Thomas & Hunt]](https://www.amazon.com.br/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052)

## Develop systemic thinking

Understand about the application domain. Know the processes and rules of this domain so that you can think of the system as a whole and create more robust solutions.

Reading recommendation:

- [Domain Driven Design [Eric Evans]](https://www.amazon.com.br/Domain-Driven-Design-Eric-Evans/dp/8550800651)

## Understand the architecture

In order to grow, a good system needs a good architecture. It's not about the folders that should be created but how each layer of the application interacts with the others in a sustainable way.

Reading recommendation:

- [Clean Architecture: A Craftsman's Guide to Software Structure and Design [Robert C. Martin]](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)

## Understand the business

For a software to generate money for a company, it must solve real problems and not theoretical ones. Many developers fall into the trap of making a complex design right from the start or creating several features that may be good, but do not solve the customer's problem. Understand the business first before spending resources to produce something. Test things out with the end customer before moving on to more complicated jobs.

Reading recommendation:

- [The Lean Startup [Eric Ries]](https://www.amazon.com.br/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898)

## General principles

These principles establish practices that lead to software development considering aspects such as maintenance and extension as the project grows. Adopting these practices can also help prevent dirty code and help with code refactoring.

### SOLID

The SOLID principles were introduced by Robert C. Martin in his 2000 article “Design Principles and Design Patterns”. These concepts were later improved upon by Michael Feathers, who introduced us to the acronym SOLID.

#### Single Responsiblity Principle

A class should have one and only one reason to change, which means a class should have only one job.

#### Open-Closed Principle

A class must be open to be extended and closed to be modified.

#### Liskov Substitution Principle

A class should be replaceable by its subclass. This means that, given that class B is a subclass of class A, we should be able to pass an object of class B to any method that expects an object of class A, and the method shouldn't give any weird output in that case.

#### Interface Segregation Principle

Many client specific interfaces are better than a general-purpose interface. Clients should not be forced to implement a function they don't need.

#### Dependency Inversion Principle

A class should depend on interfaces or abstract classes rather than concrete classes and functions. High-level modules must not depend on low-level modules. Both must rely on abstraction. Abstractions should not depend on details. Details must depend on abstractions.

### GRASP (General Responsibility Assignment Software Principles)

GRASP is a set of 9 General Responsibility Assignment Software Principles

#### 1. Information Expert

**Problem:** Where should I add new functionality?
**Solution:** Assign the responsibility to the class that has the most knowledge about the new feature.

#### 2. Creator

**Problem:** Who should create an A object?
**Solution:** Assign class B the responsibility of creating object A if one of these is true (the more items the better):

- B contains A or aggregates objects of type A
- B saves instances of A
- B closely uses instances of A
- B has the initialization data of A

#### 3. Controller

**Problem:** What is the first object, after the UI layer, that receives and controls system operations
**Solution:** Assign the responsibility to an object that represents one of the following:

- Represents the system as a whole (Facade Controller)
- Represents a use case, dealing with a sequence of operations (Session Controller)

#### 4. Low Coupling

**Problem:** How to reduce the impact of a change? How to support low dependency and increase reuse?
**Solution:** Coupling measures how one element is related to another. The greater the coupling, the greater the dependence of one element on another. One solution is to use SOLID principles.

#### 5. High Cohesion

**Problem:** How to keep objects focused on a task, easy to understand, easy to manage and, as a side effect, support Low Coupling?
**Solution:** Cohesion measures how strongly all of an element's responsibilities are related. Separate elements that do not have direct relationships with each other in other classes.

#### 6. Indirection

**Problem:** Where to assign responsibilities to avoid coupling between two or more things?
**Solution:** Assign the responsibility to an intermediary object that will play the role of mediator between these things.

#### 7. Polymorphism

**Problem:** How to handle elements that are related but have variations in element type?
**Solution:** When alternative or related behaviors vary by type, assign responsibility for the behavior (using polymorphism) to the types for which the behavior varies.

#### 8. Pure Fabrication

**Problem:** Which object should have the responsibility, when you don't want to violate High Cohesion and Low Coupling but solutions offered by other principles are not appropriate?
**Solution:** Assign a highly cohesive set of responsibilities to an artificial class that does not represent a problem domain concept.

#### 9. Protected Variations

**Problem:** How to design objects, subsystems and systems so that variations or instabilities in these elements do not have an undesirable impact on other elements?
**Solution:** Identify points of variation or anticipated instability, assign responsibilities to create a stable interface around them.

### DRY (Don't Repeat Yourself)

The focus of DRY is to avoid the repetition of information. When you write code that runs the same tasks over and over again, any modification to a task requires the same change to be made to each instance of that task. Editing each instance of a task is a lot of work.

### KISS (Keep it simple, stupid)

KISS is a design principle that states that designs and/or systems should be as simple as possible. Whenever possible, complexity should be avoided, as simplicity ensures greater levels of user acceptance and interaction.

### TDA (Tell, Don't Ask)

TDA is a principle that helps people remember that object orientation is about grouping data with the functions that operate on that data. Rather than asking an object for data and acting on that data, we should tell an object what to do. This encourages moving the behavior into the object to keep up with the data.

### LoD (Law of Demeter)

The LoD or principle of least knowledge is a design principle for software development, particularly object-oriented programs. And it's a very simple principle to learn and apply, based on three basic rules:

- A unit should have only limited knowledge about other units
- A unit should only talk to its immediate friends
- A unit must not talk to strangers

A unit, in this context, is a specific coded abstraction. It can be a function, a module or a class. And to speak here means to interface with this abstraction.

### YAGNI (You ain’t gonna need it)

YAGNI is a principle that functionality should only be added when requested. This principle eliminates excess and inefficiency in development, helping developers to avoid unnecessary effort on tasks that are assumed to be needed in the future. An example of this is premature optimizations.

## References

[Clean Code [Robert C. Martin]](https://www.amazon.com.br/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
[Domain Driven Design [Eric Evans]](https://www.amazon.com.br/Domain-Driven-Design-Eric-Evans/dp/8550800651)
[Introduction to Algorithms [Cormen & Rivest & Leiserson & Stein]](https://www.amazon.com.br/Algoritmos-Teoria-Pr%C3%A1tica-Thomas-Cormen/dp/8535236996)
[Refactoring [Martin Fowler]](https://www.amazon.com.br/Refatora%C3%A7%C3%A3o-Aperfei%C3%A7oando-Design-C%C3%B3digos-Existentes/dp/8575227246)
[The Clean Coder [Robert C. Martin]](https://www.amazon.com.br/codificador-limpo-conduta-programadores-profissionais/dp/8576086476)
[The Lean Startup [Eric Ries]](https://www.amazon.com.br/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898)
[The Mythical Man-Month [Frederick Brooks]](https://www.amazon.com.br/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959)
[The Pragmatic Programmer [Thomas & Hunt]](https://www.amazon.com.br/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052)

---

[Home](../README.md)
