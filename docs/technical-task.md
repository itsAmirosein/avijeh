# Technical Task

## Overview

The goal of this task is to build a **flight search result page** based on the API response and the data structure described in the `Data Description` document.

You are free to design the internal implementation and architecture of the application. However, the following technical requirements must be considered.

---

## Requirements

### 1. Result Page

Create a flight search result page based on the provided API response and the data described in the `Data Description` document.

The page should correctly process and display the available flight data.

### 2. API Requests

You must fetch the API data **only once**.

After the initial request, operations such as sorting, filtering, and pagination should be handled using the data that has already been fetched.

Avoid unnecessary API requests.

### 3. Sorting

Implement sorting for the specified fields.

The sorting implementation should be reusable and should work correctly with the provided data.

### 4. Pagination

Implement pagination for the flight results.

Pagination should work correctly together with sorting and filtering.

### 5. Filtering

Implement the required filters for the flight results.

The filters must support both **AND** and **OR** behavior where applicable.

The filtering logic should be designed in a way that can be extended with additional filters in the future.

### 6. Loading State

Handle the loading state while the initial data is being fetched.

The user should receive appropriate feedback while the application is waiting for the API response.

### 7. Empty / Not Found State

Handle cases where no results are available.

The page should display an appropriate empty state when:

* The API returns no results.
* The selected filters produce no results.
* The selected sorting/pagination state does not contain any results.

### 8. Error Handling

Handle API errors appropriately.

The application should not break or display an unusable page when the API request fails.

Provide an appropriate error state for the user.

### 9. Application Architecture

The architecture of the application is an important part of this task.

Organize the application in a way that keeps responsibilities separated and makes the code easy to understand and maintain.

Consider:

* Component responsibilities.
* Data transformation.
* Business logic.
* Reusable utilities/composables.
* State management.
* Separation of concerns.
* Scalability and maintainability.

### 10. TypeScript

You **must use TypeScript** throughout the project.

The API data should be properly typed, and your transformed/internal data structures should also have appropriate types.

### 11. Framework

You may use either **Nuxt** or **Vue** for this task.

You must use **TypeScript** regardless of the framework you choose.

---

## AI Usage

AI tools may be used **only as a search/reference tool**, similar to using Google or official documentation.

For example, you may use AI to:

* Understand an unfamiliar API.
* Find documentation.
* Search for an explanation of a technical concept.
* Investigate an error.
* Find possible approaches to a technical problem.

However, you must **not use AI agents, agentic engineering, or vibe coding to build the project**.

The implementation should be your own work, and you should be able to explain the decisions and code you submit.

---

# What We Evaluate

This task is not only about whether the final page works.

We are also interested in **how you approach the problem and how you build the application**.

The main evaluation criteria are:

### 1. Delivery Time

How efficiently you can analyze the requirements and deliver a working solution.

### 2. Data Structure

How you model and transform the API data.

We want to see whether you can create a clean and practical data structure rather than simply passing the raw API response through the entire application.

### 3. Application Architecture

How you organize the application and separate responsibilities.

We are looking for an architecture that is understandable, maintainable, reusable, and scalable.

### 4. Performance

How efficiently your application processes and renders the data.

This includes the implementation of filtering, sorting, pagination, and data transformations.

### 5. Code Quality

We will consider:

* Readability.
* Maintainability.
* Naming.
* Type safety.
* Reusability.
* Separation of concerns.
* Consistency.
* Avoiding unnecessary complexity.

### 6. Problem Solving

We are interested in how you approach the problem, make technical decisions, and handle edge cases.

You should be able to explain **why** you chose a particular implementation rather than simply showing that it works.

---

## Completion vs. Quality

You do **not necessarily need to implement every requirement to receive a good evaluation**.

If you are unable to complete all parts of the task within the available time, prioritize the most important parts and make sure the implemented parts are well-designed and maintainable.

Your evaluation will consider both **what you completed** and **the quality of your implementation**.

A partially completed solution with a strong architecture, good data modeling, and high-quality code may receive a better evaluation than a fully completed solution with poor architecture or implementation quality.

---

## Important

We recommend that you think about the overall architecture and data structure **before starting implementation**.

Do not focus only on making the page work as quickly as possible.

During the review, we may ask you to explain:

* Why you chose your data structure.
* Why you organized the application in a particular way.
* Where specific business logic lives and why.
* How filtering, sorting, and pagination work together.
* How you considered performance.
* What you would improve if you had more time.
* How your implementation could be extended in the future.
