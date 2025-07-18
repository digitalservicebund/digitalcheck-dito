# 23. Adopt Compound Component Pattern for Nested Components in React

## Status

Accepted

## Context

Our current React component design uses **deeply nested properties** to configure and render all aspects of a component. This pattern has led to several issues:

- **Reduced transparency**: The usage of a component doesn't reveal what is actually being rendered.
- **Complex nesting**: Passing structured props for subcomponents results in complex prop trees and deeply nested configurations.
- **Unintended resource file structures**: To match nested prop expectations, developers create similarly nested resource objects, although this was never the intention.

Therefore, we concidered using the **Compound Component Pattern**. In this pattern, a parent component exposes child components as static properties. The parent manages shared state and context, while the children can consume this context, enabling flexible and expressive composition.

### Benefits

- **Improved transparency**: The usage of a component shows exactly what will be rendered.
- **Better separation of concerns**: Each part of the component is explicitly named and handled.
- **Discourages complex nested props**: Encourages flat, declarative usage and makes resource usage more explicit.

### Trade-offs

- **More boilerplate**: Components are larger due to internal state/context and child definitions.
- **No enforced order**: Using properties inherently enforces the structure and order of child elements. With the compound component pattern, developers can unintentionally misorder or omit required child components, leading to incorrect rendering unless manually validated.

### Examples of current implememtation

#### Tabs

```tsx
export default function Index() {
  const tabsData: TabItem[] = [
    {
      title: index.stepByStep.tabName,
      plausibleEventName: index.stepByStep.plausibleEventName,
      content: (
        <NumberedList
          className="pb-40"
          heading={{
            tagName: "h2",
            text: index.stepByStep.title,
          }}
          items={index.stepByStep.items}
        />
      ),
    },
    {
      title: index.summary.tabName,
      plausibleEventName: index.summary.plausibleEventName,
      content: (
        <InfoBoxList
          heading={{ text: index.summary.title }}
          items={index.summary.items}
          separator
        />
      ),
    },
  ];

  return (
    <>
      <Hero
        title={index.title}
        subtitle={index.subtitle}
        backgroundColor="darkBlue"
      />

      <Container>
        <Tabs tabs={tabsData} />
      </Container>
    </>
  );
}
```

#### InfoBoxList and InfoBox

```tsx
<InfoBoxList
  heading={{ text: documentation.summary.title }}
  items={documentation.summary.items}
  separator
/>
```

```tsx
<InfoBox
  identifier={slugify(principle.title)}
  key={slugify(principle.title)}
  Icon={principle.icon}
  heading={{
    tagName: "h2",
    text: principle.title,
  }}
  badge={{
    children: principle.label,
    principleNumber: principle.principleNumber as PrincipleNumber,
  }}
  content={principle.content}
  detailsSummary={getDetailsSummary(principle.detailsSummary)}
/>
```

## Decision

We will adopt the **Compound Component Pattern** for **nested components** and use child components for all nested components.

### Pattern applied to examples

#### Tabs

```tsx
export default function Index() {
  return (
    <>
      <Hero
        title={index.title}
        subtitle={index.subtitle}
        backgroundColor="darkBlue"
      />

      <Container>
        <Tabs>
          <Tabs.Tab
            title={index.stepByStep.tabName}
            plausibleEventName={index.stepByStep.plausibleEventName}
          >
            <NumberedList
              className="pb-40"
              heading={{
                tagName: "h2",
                text: index.stepByStep.title,
              }}
              items={index.stepByStep.items}
            />
          </Tabs.Tab>

          <Tabs.Tab
            title={index.summary.tabName}
            plausibleEventName={index.summary.plausibleEventName}
          >
            <InfoBoxList
              heading={{ text: index.summary.title }}
              items={index.summary.items}
              separator
            />
          </Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}
```

#### InfoBox

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

  {/* Repeat InfoBoxList.Item + InfoBox for each item as needed */}
</InfoBoxList>
```

## Consequences

- Existing components that use the nested-prop pattern will need to be migrated.
- Resource files will need to be flattened where nested objects were only required for prop structure.
- More explicit component usage will improve maintainability and developer onboarding.
