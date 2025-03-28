# 8. Store content in a global file

## Status

- 2024-05-23: Accepted

## Context

Based on the decision outlined in [0006-store-content-in-repository-without-cms.md](0006-store-content-in-repository-without-cms.md),
we need to decide whether to store the content hardcoded in the template files or in a central location, such as a global file.

Storing the content in a global file offers significant advantages, particularly for non-technical team members.
They can more easily maintain the content without needing knowledge of technologies like HTML, JSX, React,
or similar, reducing the risk of accidental syntax errors that could break the application code. This is
crucial since most of our team members working on the content are non-technical. This approach also reduces the
need to communicate content changes to the developers, thereby increasing the velocity of content iteration.
Additionally, it shares benefits with a CMS, such as centralized content management and cleaner code
focused on functionality.

On the other hand, hardcoding the content in the templates ensures rapid development when creating new pages
and maintains a clear coupling between the content and application sections, minimizing the risk of
misplacing content. This method also eliminates the need to separate text blocks for formatting, styling,
or decorative elements, as these are all integrated within the template code.

## Decision

We store content in a global file since we aim to enable the whole team to maintain content.

We will use Markdown as the content format, as it is easy to read and write even for non-developers.

## Consequences

When creating new parts of the application, we store the content in the global file and implement a way to
inject it into the templates.

Markdown minimizes the need for splitting text content for formatting and styling via HTML/CSS.
Our components will be able to render Markdown into HTML.

We enable and support our non-technical colleagues to use Markdown and maintain content using the GitHub web
application or any other IDE / editor by offering a workshop and close support.
