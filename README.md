# Automated Testing with Symbolic Execution

## Project Aim

The aim of this project is to demonstrate a robust approach to *automated testing* in modern web applications, with a focus on *authentication flows. This project employs **unit testing, **integration testing, and **symbolic execution* to verify the correctness of user authentication mechanisms and user interface elements. Additionally, it uses *mocking* and *symbolic execution* to explore a variety of edge cases that the system might encounter.

The project serves as an example of how to combine front-end testing with more advanced techniques like symbolic execution to ensure the application’s integrity and reliability.

## Tools Used

- *Jest*: For unit and integration testing, including mocking functionalities.
- *React Testing Library*: For rendering components and simulating user interactions in a React environment.
- *Clerk*: For handling user authentication, used here to simulate sign-up, log-in, and log-out states.
- *Symbolic Execution Tools*: Custom symbolic execution script using Jalangi and S$ to simulate different execution paths and edge cases.
- *TailwindCSS*: For styling the components in the app.
- *Prisma*: For handling database operations with the application's user data.

## Features and Functionality

- *User Authentication Flow Testing*: Tests the sign-up, log-in, and log-out flow with the ability to mock various states (signed in, signed out).
- *Symbolic Execution*: The project uses symbolic execution to test a variety of user inputs and edge cases that cannot be easily covered through manual testing.
- *UI and Component Testing*: Includes tests for various UI components like buttons, modals, and forms, ensuring that the correct elements appear based on the user's authentication state.
- *Edge Case Simulation*: Automatically simulates multiple execution paths and tests edge cases such as invalid login attempts and session timeouts.

# Automated Testing with Symbolic Execution

## Symbolic Execution and Mocking

### Symbolic Execution

The project leverages symbolic execution to model various paths that the user might take during authentication (sign-up, log-in, etc.). This allows for thorough testing, particularly in edge cases where combinations of user inputs might result in unexpected outcomes. The symbolic execution uses *Jalangi* and *S$* to track symbolic variables and execution states. The clerk_jalangi.js script simulates multiple input variations to test for potential issues, such as invalid usernames and passwords.

*Key symbolic execution paths tested:*

- *Sign-Up Process*: Testing the validity of username and password combinations and ensuring proper storage of user data.
- *Log-In Process*: Simulating successful and failed login attempts based on various conditions (e.g., invalid credentials, incorrect session management).
- *Edge Cases*: Testing with extreme or unexpected inputs (empty fields, special characters, etc.).

### Mocking in Tests

The *Jest* testing framework is used extensively across the application. *useAuth* from Clerk is mocked to simulate different authentication states, and these mock implementations are used to verify how the UI responds to the logged-in and logged-out conditions.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- *Node.js* (v16.0 or later)
- *npm* or *yarn* (for dependency management)

### Installation

Clone the repository and install the required dependencies:

bash
git clone https://github.com/Vineexoxo/Automated-Testing.git
cd Automated-Testing
npm install

## Running Tests

### Unit Tests

To run the unit tests for the various components (including symbolic execution tests):

bash
npm test


## Symbolic Execution Tests

To run the symbolic execution tests, use the following command, which uses the Jalangi tool to simulate different execution paths:

```bash
npm run symbolic-test

This command will instrument the code and execute the symbolic execution based on predefined paths to check for edge cases.

## Test Execution Process

1. *We start with a test string*

   The process starts with a test string that represents a sequence of actions and their expected consequences, similar to a state chart diagram.

   *Example Test String:*
   - Sign Up → Sign-Up Page
   - Log Out → Home Page
   - Sign In → Sign-In Page

   This string captures the flow of a user through a specific use case scenario.

2. *Instrumented Code*

   A simplified, instrumented code version is generated to simulate the actions in the test string. This code interacts symbolically with API calls, capturing their expected responses.

   *Instrumented Code Highlights:*
   - Actions like "Sign Up" or "Sign In" are symbolically executed.
   - Responses from the APIs are treated symbolically to allow exploration of multiple execution paths.

3. *Generating Test Paths with ExpoSE*

   The instrumented code is executed using *ExpoSE*, a symbolic execution engine. This generates all possible execution paths based on the input test string and the symbolic API interactions.

   *Output:*
   - A JSON file containing the detailed test paths, with each path capturing:
     - The sequence of actions.
     - API call responses dynamically determined during symbolic execution.

4. *Test Execution on Codebase*

   The test paths are fed into a test code that simulates the same series of actions as the test string.

   *Key Features:*
   - The test code reads the JSON file and dynamically sets the expected API responses.
   - API calls are dynamically mocked during the tests to return values defined in the test paths.
   - This ensures that the test execution mirrors the symbolic execution accurately.


## Contribution

### Vineet Priyedarshi
- Implemented the logic for symbolic execution using Jalangi and S$.
- Worked on creating the user authentication tests and ensuring that all edge cases were covered.
- Developed the unit testing strategy and framework for testing components with mocked data.
- Contributed to writing Jest-based tests for the login/logout flows and various UI components.

### Varshith Vattikuti
- Worked on integrating Tailwind CSS into the project for responsive and consistent styling across components.
- Contributed to writing integration tests, including the authentication tests for user log-in and session management.

## Future Enhancements

- *Extended Symbolic Execution*: Adding more complex test cases that cover rare edge cases in user authentication flows.
- *Cross-Browser Testing*: Implementing Selenium WebDriver for testing across different browsers to ensure compatibility.
- *Continuous Integration (CI) Pipeline*: Integrating tests with a CI tool (like GitHub Actions or Jenkins) to run tests automatically on every commit.
