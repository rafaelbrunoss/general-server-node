# Tests

Testing is an essential part of product development, especially to ensure product quality. Automated tests are important because they are faster to write and run (in the long run) than manual tests. In addition, people doing manual tests may forget a step, when automated tests have all the test paths they must follow mapped out. In the long run, automated testing saves the team a lot of time, as well as reducing the appearance of bugs.

## Types of Test

### Unit Test

A unit test is a way of testing a unit, the smallest piece of code that can be logically isolated in a system. In most programming languages, this is a function, subroutine, method, or property.

### Integration Test

An integration test is a type of test where software modules are logically integrated and tested as a group. The purpose of this level of testing is to expose defects in the interaction between these software modules when integrated

### End-to-End Test (e2e)

End-to-End Testing (e2e) is a technique that tests the entire product from start to finish to ensure that the application flow behaves as expected. It defines the product's system dependencies and ensures that all integrated parts work together as expected. The main objective of end-to-end testing (E2E) is to test from the end-user experience, simulating the real user scenario and validating the system under test and its components for integration and data integrity.

## Test Design

Test codes should be simple and easy to understand. One of the conventions adopted to achieve this is called AAA (Arrange, Act, Assert)

- **Arrange:** all the configuration code to bring the system to the scenario that the test intends to simulate. This can include instantiating the constructor of the unit being tested, adding database records, mock objects, and any other preparation code.
- **Act:** run the unit being tested. Usually one line of code.
- **Assert:** Ensure that the received value meets the expectation. Usually one line of code

When building the test report, include 3 parts in each test name:

1. What is being tested
2. What is the test circumstance and scenario
3. What is the expected result

The last two steps are easier to identify using the following structure: "**Given** a certain context, **when** something happens, **then** something is expected"

Example:

```node
//1. Unit under test
describe('Product Service', () => {
  // 2. Scenario
  describe('Add new product', () => {
    //3. Expected result
    it('When the price is not specified, then the product status is PENDING_APPROVAL', () => {
      // Arrange
      const productOptions = {};

      // Act
      const newProduct = new ProductService().add(productOptions);

      // Assert
      expect(newProduct.status).to.equal('PENDING_APPROVAL');
    });
  });
});
```

When working on the frontend, you may also consider implementing [Page Objects](https://martinfowler.com/bliki/PageObject.html) while writing tests.

---

[Home](../README.md)
