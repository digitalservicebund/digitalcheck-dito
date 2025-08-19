# 23. Children‑First React Component API (with Named Slots)

**Status**: Accepted
**Date**: 2025‑08‑19
**Applies to**: All React components in this codebase

---

## Context

Our current component APIs often rely on **deeply nested configuration props** to describe the entire render tree. This has led to:

- **Low transparency**: Reading a component’s usage doesn’t reveal what will actually render.
- **Complex prop shapes**: Deep object trees for subcomponents are hard to type, test, and maintain.
- **Leaky resource structures**: Content files end up mirroring UI nesting just to satisfy prop shapes.

**Example from current code**

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

---

## Decision

We adopt a **children‑first** component design. When explicit placement is needed, we use **named slots** implemented as **components in props** (i.e., props that accept React elements). Props for child content **must be primitives** (e.g., `string`, `number`, `boolean`) or simple flags—**not** nested object trees.

### Design rules

1. **Prefer Children for structure and content**
   Express layout and content directly in JSX to make render output obvious.

2. **Use Named Slots via Components‑in‑Props** _only when placement is fixed by the parent_
   Examples: `icon`, `badge`, `button`. These props accept **elements**, not config objects.

3. **Keep props primitive**
   Pass simple values (text, ids, numbers, booleans). Avoid passing object props that represent subcomponents.

4. **Use Compound Containers when children share state**
   For repeatable items with coordinated state (tabs, accordions, menus), use a container with typed child components (e.g., `<Tabs><Tabs.Tab/></Tabs>`).

5. **Reject the strictly rigid compound pattern**
   We intentionally avoid a design that forces every subpart to be addressed only through static subcomponents and forbids ad‑hoc JSX.

---

## Rationale / Benefits

- **Transparency**: Usage shows exactly what will render.
- **Declarative, flat APIs**: Fewer nested shapes; easier to reason about.
- **Flexibility where needed**: Children allow exceptions without changing component APIs.
- **Better content authoring**: Resource files stay flat; content is not forced to mirror UI trees.
- **Testability**: Children are easy to snapshot and query; slot components remain unit‑testable.
- **Type simplicity**: Fewer complex prop types and discriminated unions for nested config.

---

## Trade‑offs

- **More boilerplate**: Writing JSX instead of passing config objects increases lines of code.
- **Potential misuse**: Children can be anything; documentation and examples must guide composition.
- **Slightly more runtime checks**: Optional runtime assertions may be added to enforce child order.

---

## Examples (Before → After)

### Tabs

<!-- Not the best example here, maybe there is a better one -->

**Before (nested data config)**

```tsx
return (
  <Tabs
    tabs={[
      { title: "Tab1", plausibleEventName: "tab.tab1", content: <Content /> },
      { title: "Tab2", plausibleEventName: "tab.tab2", content: <Content /> },
    ]}
  />
);
```

**After (compound container + children)**

```tsx
<Tabs>
  <Tabs.Tab title="Tab1" plausibleEventName="tab.tab1">
    <Content />
  </Tabs.Tab>
  <Tabs.Tab title="Tab2" plausibleEventName="tab.tab2">
    <Content />
  </Tabs.Tab>
</Tabs>
```

### InfoBoxList + InfoBox

**Before (nested object props)**

```tsx
<InfoBoxList
  heading={{ text: "Title" }}
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
```

**After (children + named slots)**

```tsx
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
          <DetailsSummary.Detail title={detail.title}>
            {detail.content}
          </DetailsSummary.Detail>
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
    Content **Text** in Markdown format.
  </InfoBox>
</InfoBoxList>
```

### Simple, primitive props only (no nested objects)

```tsx
// ✅ OK: primitives + elements for explicit slots
<Card title="My card" featured>
  <p>Body text</p>
</Card>

// ❌ Avoid: nested object just to configure subcomponents
<Card title={{ text: "My card", level: 2 }} />
```

### Modal (fixed placement with named slots)

```tsx
<Modal
  open
  onClose={close}
  title="Delete item"
  footerActions={
    <>
      <Button variant="secondary" onClick={close}>
        Cancel
      </Button>
      <Button variant="danger" onClick={confirm}>
        Delete
      </Button>
    </>
  }
>
  <p>This action cannot be undone.</p>
</Modal>
```

---

## Implementation Notes (typing & API shape)

**Typical prop types**

```ts
// Children-first, with named slots that accept elements.
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

---

## Pattern Summary

- **Children** (preferred): arbitrary JSX for structure and content.
- **Components‑in‑Props (named slots)**: for fixed placement like `icon`, `badge`, `actions`, `footer`.
- **Primitives‑only props**: keep configuration simple (strings, numbers, booleans, ids).
- **Compound containers**: when children share state (tabs, accordion, menus, steppers).

---

## Alternatives Considered

### Strict Compound Component Pattern (rejected)

We considered a fully rigid pattern that exposes every subpart as a static subcomponent and forbids ad‑hoc JSX. Example:

```tsx
<InfoBoxList separator>
  <InfoBoxList.Heading>{documentation.summary.title}</InfoBoxList.Heading>
  <InfoBoxList.Item>
    <InfoBox>
      <InfoBox.Badge {...badge} />
      <InfoBox.Heading {...heading} />
      <InfoBox.Content markdown={content} />
      <InfoBox.DetailsSummary {...detailsSummary} />
      <InfoBox.LinkList {...linkList} />
      <InfoBox.Buttons buttons={buttons} />
    </InfoBox>
  </InfoBoxList.Item>
</InfoBoxList>
```

**Why rejected**: verbose, brittle, and discourages simple composition; pushes us back toward config objects and nested prop shapes.

---

## Migration Plan

1. **New components** must follow this ADR.
2. **Existing components**
   - Replace nested config objects with child elements and/or named slot elements.
   - Keep prop names for primitives (e.g., `title`, `id`, `variant`).
   - Provide deprecation warnings where feasible.

3. **Resource/content files**: flatten structures that were only nested to satisfy UI prop shapes.

---

## Consequences

- **Migrations** for components that rely on nested config props.
- **Flatter content** models and clearer examples.
- **More explicit usage** improves maintainability, onboarding, and testability.
