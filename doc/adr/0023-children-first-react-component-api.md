# 23. Children‑First React Component API (with Components-in-Props)

## Status

- 2025‑08‑19: Accepted
- 2025-12-08: Amended: use exported components, e.g., `Tab` instead of `Tabs.Tab`

## Context

Our previous component APIs often relied on **deeply nested configuration props** to describe the entire render tree. This has led to:

- **Low transparency**: Reading a component’s usage doesn’t reveal what will actually render.
- **Complex prop shapes**: Deep object trees for subcomponents are hard to type, test, and maintain.
- **Leaky resource structures**: Content files end up mirroring UI nesting just to satisfy prop shapes.

**Example from previous code**

```tsx
// app/routes/methoden.fuenf-prinzipien/Principle.tsx
<InfoBox
  identifier={slugify(prinzip.Name)}
  heading={{ tagName: "h2", text: prinzip.Name }}
  badge={{
    children: methodsFivePrinciples.principleLabel,
    principleNumber: prinzip.Nummer,
  }}
  content={prinzip.Beschreibung}
  detailsSummary={getDetailsSummary(prinzip)}
/>
```

## Decision

We adopt a **children‑first** component design.
When subcomponents need to be rendered in specific locations (like a custom close button in a modal component), we use **components-in-props** (i.e., props that accept React elements).

Props for child content that aren't components **should be primitives** (e.g., `string`, `number`, `boolean`) or simple flags instead of nested object trees.

### 1. Prefer Children for structure and content

Express layout and content directly in JSX to make render output obvious and offer more flexibility.

```tsx
// Before (main content as prop, limited to simple text)
<DetailsSummary title={content.title} content={content.text} actions={[{label: "Close"}]} />

// After (children with more flexibility)
<DetailsSummary title={content.title}>
  <Richtext content={content.text} />
  <Button>Close</Button>
</DetailsSummary>
```

### 2. Use Components‑in‑Props _only when placement is fixed by the parent_

Examples: `icon`, `badge`, `button`. These props accept **JSX elements**, not config objects.

```tsx
// Before (nested object props)
<InfoBoxList
  heading={{ tagName: "h2", text: "Title" }}
  items={[
    <InfoBox
      Icon={Icon}
      heading={{ tagName: "h2", text: "Title" }}
      badge={{ children: "Label", principleNumber: 1 }}
      content={principle.content}
      detailsSummary={getDetailsSummary(principle.detailsSummary)}
    />,
    // ...
  ]}
  separator
/>

// After (children + components-in-props)
<InfoBoxList heading={<Heading tagName="h2">Title</Heading>} separator>
  <InfoBox
    badge={
      <Badge icon={badgeIcon} principleNumber={1}>
        Label
      </Badge>
    }
    heading={<Heading tagName="h3">Heading text</Heading>}
    detailsSummary={
      <DetailsSummary>
        {principle.detailsSummary.map((detail) => (
          <Detail title={detail.title}>
            {detail.content}
          </Detail>
        ))}
      </DetailsSummary>
    }
    actions={
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    }
  >
    <Richtext content={principle.content} />
  </InfoBox>
</InfoBoxList>
```

### 3. Keep other props primitive

Pass simple values (text, ids, numbers, booleans). Avoid passing object props that represent subcomponents.

```tsx
// ✅ OK: primitives
<Card title="My card">
  <p>Body text</p>
</Card>

// ❌ Avoid: nested object just to configure subcomponents
<Card title={{ text: "My card", level: 2 }}>
  <p>Body text</p>
</Card>

// ✅ Alternative: Use children
<Card>
    <Heading level={2}>My card</Heading>
    <p>Body text</p>
</Card>
```

### 4. Use Compound Containers when children share state

For repeatable items with coordinated state (tabs, accordions, menus), use a container with corresponding child components.

```tsx
// Before (nested data config)
<Tabs
  tabs={[
    { title: "Tab1", plausibleEventName: "tab.tab1", content: <Content /> },
    { title: "Tab2", plausibleEventName: "tab.tab2", content: <Content /> },
  ]}
/>

// After (compound container + children)
<Tabs>
  <Tab title="Tab1" plausibleEventName="tab.tab1">
    <Content />
  </Tab>
  <Tab title="Tab2" plausibleEventName="tab.tab2">
    <Content />
  </Tab>
</Tabs>
```

### 5. Reject the strictly rigid compound pattern

We intentionally avoid an alternative design that forces every subpart to be addressed only through static subcomponents and forbids ad‑hoc JSX as it is even more verbose, brittle, and discourages simple composition.

```tsx
// ❌ Avoid: using typed child components for all children
<InfoBoxList separator>
  <InfoBoxListHeading>{documentation.summary.title}</InfoBoxListHeading>
  <InfoBoxListItem>
    <InfoBox>
      <InfoBoxBadge {...badge} />
      <InfoBoxHeading {...heading} />
      <InfoBoxContent markdown={content} />
      <InfoBoxDetailsSummary {...detailsSummary} />
      <InfoBoxLinkList {...linkList} />
      <InfoBoxButtons buttons={buttons} />
    </InfoBox>
  </InfoBoxListItem>
</InfoBoxList>
```

## Consequences

| Benefits                                                                                          | Drawbacks                                                                                          |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Transparency**: Usage shows exactly what will render.                                           | **More boilerplate**: Writing JSX instead of passing config objects increases lines of code.       |
| **Declarative, flat APIs**: Fewer nested shapes; easier to reason about.                          | **Potential misuse**: Children can be anything; documentation and examples must guide composition. |
| **Flexibility where needed**: Children allow exceptions without changing component APIs.          |                                                                                                    |
| **Better content authoring**: Resource files stay flat; content is not forced to mirror UI trees. |                                                                                                    |
| **Type simplicity**: Fewer complex prop types and discriminated unions for nested config.         |                                                                                                    |
| **More explicit usage**: improves maintainability, onboarding, and testability.                   |                                                                                                    |

### Migration Plan

1. **New components** must follow this ADR.
2. **Existing components** will be migrated when touched or when we find time in a sprint.
3. **Resource/content files** will be flattened according to the boyscout rule (i.e., when touched).

## Implementation Notes (typing & API shape)

**Typical prop types**

```ts
// Children-first, with components-in-props that accept elements.
export type InfoBoxProps = {
  /** Optional id for anchors/tracking */
  id?: string;
  /** Optional classname */
  className?: string;
  /** Heading can be raw text or a full element */
  heading?: React.ReactNode | string;
  /** Badge is a placed slot, not a config object */
  badge?: React.ReactElement<BadgeProps> | null;
  /** Details summary slot */
  detailsSummary?: React.ReactNode;
  /** Actions area (buttons, links) */
  actions?: React.ReactNode;
  /** Main content */
  children: React.ReactNode;
};
```
