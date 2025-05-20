# 20. Updated guidelines for testing

## Status

- 2025-05-20: Proposed

## Context

We want to make some updates to our testing strategy, as we are having more and more e2e tests. Maintaining e2e tests can sometimes be hard and they are prone to flakiness. Thats why we want to use unit tests more often in the future.

Unit tests are typically fast, provide precise feedback, are less prone to flakiness, and are cheaper to write and maintain compared to e2e tests.

## Decision

### Prioritize Unit Tests Where It Makes Sense

- Use unit tests to cover business logic, algorithms, helper functions, and individual component states/behaviors without their external dependencies (which should be mocked or stubbed).
- Prefer unit tests over integration or E2E tests if the logic can be tested in isolation.

### Use ARIA Roles for Test Selectors (Over Test IDs)

- When writing tests that interact with the UI, test selectors should primarily target ARIA roles and accessible names.
- Test IDs should be considered a fallback, used only when semantic roles are not applicable or sufficient.
- Encourages the development of more accessible applications by aligning tests with how users (and assistive technologies) perceive and interact with the UI.

### Employ Snapshot Testing where it makes sense

- Snapshot testing will be utilized for verifying the output of UI components or complex data structures when appropriate.
- Snapshot tests are effective for catching unintended changes in large or complex outputs where manually writing assertions for every detail would be impractical.
- They are particularly useful for UI component rendering (to detect unexpected visual/structural changes) and large data structures (like API responses or generated configurations).

## Consequences

### Benefits

- Emphasis on unit tests provides quicker feedback to developers.
- Using role-based selectors can reduce test fluctuation.
- Prioritizing ARIA roles promotes building accessible products.

### Drawbacks/Considerations

- Snapshots can become a maintenance overhead if not managed carefully, especially for frequently changing UI or data.
- When non developers update texts, snapshots or role-based selectors may be updated to fix failing tests.
