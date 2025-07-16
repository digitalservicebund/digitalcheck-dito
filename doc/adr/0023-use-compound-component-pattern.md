# 23. Adopt Compound Component Pattern for Nested Components in React

## Status

Accepted

## Context

Our current React component design uses **deeply nested properties** to configure and render all aspects of a component. This pattern has led to several issues:

- **Reduced readability**: The usage of a component doesn't reveal what is actually being rendered.
- **Complex nesting**: Passing structured props for subcomponents results in complex prop trees and deeply nested configurations.
- **Unintended resource file structures**: To match nested prop expectations, developers create similarly nested resource objects, although this was never the intention.

Here is an example for the tab component:

```tsx
TODO;
```

Therefore, we **Compound Component Pattern**. In this pattern, a parent component exposes child components as static properties. The parent manages shared state and context, while the children can consume this context, enabling flexible and expressive composition.

### Benefits

- **Improved readability**: The usage of a component shows exactly what will be rendered.
- **Better separation of concerns**: Each part of the component is explicitly named and handled.
- **Discourages complex nested props**: Encourages flat, declarative usage and makes resource usage more explicit.

### Trade-offs

- **More boilerplate**: Components are larger due to internal state/context and child definitions.
- **No enforced order**: Using properties inherently enforces the structure and order of child elements. With the compound component pattern, developers can unintentionally misorder or omit required child components, leading to incorrect rendering unless manually validated.

## Decision

We will adopt the **Compound Component Pattern** for **nested components**.

Example:

```tsx
TODO;
```

## Consequences

- Existing components that use the nested-prop pattern will need to be migrated.
- Resource files will need to be flattened where nested objects were only required for prop structure.
- More explicit component usage will improve maintainability and developer onboarding.
