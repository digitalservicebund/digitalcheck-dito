# 23. Adopt Mix of Compound Component Pattern and Components in Props

## Status

Accepted

## Context

Our current React component design uses **deeply nested properties** to configure and render all aspects of a component. This pattern has led to several issues:

- **Reduced transparency**: The usage of a component doesn't reveal what is actually being rendered.
- **Complex nesting**: Passing structured props for subcomponents results in complex prop trees and deeply nested configurations.
- **Unintended resource file structures**: To match nested prop expectations, developers create similarly nested resource objects, although this was never the intention.

Therefore, we considered using a mix of the **Compound Component Pattern** and **Components in Props**.

In the **Compound Component Pattern** pattern, a parent component exposes child components as static properties. The parent manages shared state and context, while the children can consume this context, enabling flexible and expressive composition.

In the **Components in Props** pattern, we directly pass child components into props instead of only there props to avoid deep prop nesting.

### Benefits

- **Improved transparency**: The usage of a component shows exactly what will be rendered.
- **Better separation of concerns**: Each part of the component is explicitly named and handled.
- **Discourages complex nested props**: Encourages flat, declarative usage and makes resource usage more explicit.
- **Enforced order**: This can still be achieved with components in props.

### Trade-offs

- **More boilerplate**: Components are larger due to internal state/context and child definitions.

### Examples of current implememtation

#### Tabs

```tsx
export default function Index() {
  const tabsData: TabItem[] = [
    {
      title: "Tab1",
      plausibleEventName: "tab.tab1",
      content: (<Content />),
    },
    {
      title: "Tab2",
      plausibleEventName: "tab.tab2,
      content: (<Content />),
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
  heading={{ text: "Title" }}
  items={[
    <InfoBox
      Icon={Icon}
      heading={{
        tagName: "h2",
        text: "Title",
      }}
      badge={{
        children: "Label",
        principleNumber: 1,
      }}
      content={principle.content}
      detailsSummary={getDetailsSummary(principle.detailsSummary)}
    />,
  ]}
  separator
/>
```

## Decision

### Compound Component Pattern

- For containers with repeatable child components (tabs, accordion, menus)
- When child components depend on shared state (tabs, accordion, menus)
- For more complex components where we control the position/order through child components (cards where order could change, navs with mix of links and dropdowns)
- Container with simpler repeatable children (buttonlists, linklists)

### Children

- For content with arbitrary jsx (tab item content)
- For main/longer content (accordion item content, infobox content)

### Props

- For child components that have a fixed position/depend on a specific place in the structure (infobox badge, icons)
- For shorter / text only components (titles)
- For fixed sets of sub components (enum with icons that can be displayed)

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
          <Tabs.Tab title="Tab1" plausibleEventName="tab.tab1">
            <Content />
          </Tabs.Tab>

          <Tabs.Tab title="Tab2" plausibleEventName="tab.tab2">
            <Content />
          </Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}
```

#### InfoBox

```tsx
<InfoBoxList heading={<Heading>Title</Heading>} separator>
  <InfoBoxList.Item
    badge={
      <Badge icon={badgeIcon} principleNumber="1">
        Badge Text
      </Badge>
    }
    heading={<Heading tagName="h2">Heading text</Heading>}
    detailsSummary={<DetailsSummary>{content}</DetailsSummary>}
    buttons={
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    }
  >
    Content **Text** in a Markdown format.
  </InfoBoxList.Item>

  {/* Repeat InfoBoxList.Item + InfoBox for each item as needed */}
</InfoBoxList>
```

## Consequences

- Existing components that use the nested-prop pattern will need to be migrated.
- Resource files will need to be flattened where nested objects were only required for prop structure.
- More explicit component usage will improve maintainability and developer onboarding.
