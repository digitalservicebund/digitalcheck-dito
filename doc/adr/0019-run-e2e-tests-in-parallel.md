# 19. Run e2e tests in parallel

## Status

- 2025-03-25: Drafted

## Context

Our Playwright e2e test suite is growing (see [0012 Guidelines for testing](./0012-guidelines-for-testing.md)),
leading to longer execution times in our pipeline. This slows down development feedback and deployment speed.
We want to optimize test execution.

Running tests sequentially is inefficient. Some tests are independent and can run in parallel,
while others benefit from sequential execution due to shared state (i.e. preparing the page in `beforeAll()`).

Using GitHub actions as our pipeline architecture results in rather weak machines running the tests. Hence,
using multiple workers to run tests in parallel does not speed up our tests execution but increases
the likelihood of flaky tests due to resource limits.

We aim to:

- Maximize parallel execution for independent tests.
- Ensure sequential execution for state-dependent tests.
- Utilize sharding to distribute parallel tests across multiple machines in the pipeline.

## Decision

We will implement the following:

- Enable playwright option `fullyParallel` to run all independent tests concurrently.
- Explicitly configure tests sharing a state to be executed sequentially.
- Implement GitHub Actions sharding to distribute parallel tests evenly across multiple machines.

## Consequences

Positive:

- Reduced test execution time: Parallelization and sharding will decrease overall test time.
- Faster feedback loop: Developers will receive test results more quickly.
- Improved deployment speed: Shorter test times will accelerate deployments.
- Improved scalability: Sharding will allow us to handle larger test suites.

Negative:

- Increased complexity: Managing and configuring parallel execution and sharding adds complexity.
- Increased resource consumption: Parallel tests consume more resources concurrently.
