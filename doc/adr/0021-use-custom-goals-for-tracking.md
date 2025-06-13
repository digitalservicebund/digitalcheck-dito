# 21. Use custom goals for tracking.

## Status

- 2025-06-13: Accepted

## Context

We need reliable insights in how our page is used. Plausible does not provide us with enough information, as it by default just tracks page visits.

To achieve a better tracking Plausible provides custom goals, that can track individual elements on our page by adding a class like this:

```tsx
<div className="plausible-event-name=SomeEvent">Some text</div>
```

[https://plausible.io/docs/goal-conversions](https://plausible.io/docs/goal-conversions)

## Decision

We want to use custom goals for every page and user interaction in our application. When implementing a new page also tracking has to be thought of.

We gradually increase the coverage while working on the page.

### Goal documentation

Custom goals are documented in Miro here: https://miro.com/app/board/uXjVIyLyJes=/?share_link_id=659129692174

### Plausible event name format

For consistency we decided on an event name schema:

| Page                     | Page Area           | Main Item | Sub Item        |
| ------------------------ | ------------------- | --------- | --------------- |
| Start Page               | Content             | Steps     | Link Erarbeiten |
| (Automatically detected) | (Where on the page) |           |                 |

- As a separator for `Page Area`, `Main Item`, and `Sub Item` we use "."
- Spaces are represented as "+"

This example would look like this:

```tsx
<div>
  <h2>Steps:</h2>
  <a
    href="/erarbeiten"
    className="plausible-event-name=Content.Steps.Link+Erarbeiten"
  >
    Erarbeiten
  </a>
</div>
```

More examples can be found in [Miro](https://plausible.io/docs/goal-conversions)

## Consequences

### Benefits

- More and better insights in how our page is being used
- The possibility to focus on relevant functionality and remove unused ones

### Drawbacks/Considerations

- Tracking has to be thought of while developing (It can be easy forgotten)
- Custom event names add more work for implementation
- Multiple custom events can be hard to keep track of in Plausible
