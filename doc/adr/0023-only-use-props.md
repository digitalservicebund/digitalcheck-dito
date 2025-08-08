# 23. Only use props for nested components

## Status

Accepted

## Context

Our current React component design uses **deeply nested properties** to configure and render all aspects of a component. Although this pattern has led to several issues (reduced readability, complex nesting, unintended resource file structures), it doesn't proof to be a huge pain point for DX.

Here is an example for using the tab component:

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

### Benefits

- **Clean Render Tree**: The main component's return statement is extremely readable. The complexity of the tab content is abstracted away into the `tabsData` variable, making the page's overall structure easy to grasp at a glance.

- **Strong Type Safety**: By defining `TabItem[]`, the compiler will ensure that every object in your `tabsData` array has the required properties (title, content, etc.), preventing runtime errors.

- **Simplicity of the Tabs Component**: The Tabs component itself remains simple. Its only job is to receive an array, map over it to create the tab navigation, and display the content of the currently active tab. It doesn't need complex logic to inspect its children and has full control over the rendering process.

### Trade-offs

- **Awkward Composition**: Placing large, complex JSX blocks inside an object property (`content: <.../>`) feels like an anti-pattern. It breaks the standard declarative flow of React, where components are typically composed directly within the JSX tree of the return statement. Additionally, with the current approach for content management, it forces us to remap the content to the props of the nested component, foregoing the benefits of just defining the content in the resource file.

- **Reduced Readability of Content**: While the return statement is clean, we've simply moved the complexity. The `tabsData` variable itself can become a massive, deeply nested object that is difficult to read and navigate.

- **State Management Complexity**: If a component inside a tab's content needs to interact with state or props from the parent Index component, you have to "tunnel" that data through the configuration object. This can be cumbersome compared to passing props directly in the JSX tree.

- **Less Flexible Developer Experience (DX)**: It's less intuitive for a developer to modify the UI. To change the content of a tab, they have to find the correct object in the `tabsData` array rather than simply editing the JSX in the return block where the UI is structured.

## Decision

We will leave everything as it is.

## Consequences

- We won't have to migrate existing components that use the nested-prop pattern.
