# 24. Use localStorage to store data on the client

## Status

- 2025-10-08: Accepted

## Context

We are building a new feature that allows users to create the Digitalcheck documentation online instead of using the existing `docx` template. To ensure usability during the form flow, we need to persist user input so that progress is not lost when navigating between pages or if the browser is closed unexpectedly.

The user input includes sensitive information that should not be stored on our servers without implementing extensive security measures, compliance processes, and infrastructure. For an MVP, we aim to keep the data exclusively on the client. We assume that our users work on secured devices (e.g. SINA laptops), so the data remains secure as long as it does not leave the client.

Several client-side storage options were evaluated:

- **Cookies**: Sent to the server with every request and therefore exposing the sensitive information. Furthermore, limited in size (typically 4KB per cookie), which free-text fields can easily exceed, making them unsuitable for storing larger form data.
- **IndexedDB**: Designed for complex relational data structures with query capabilities. While powerful, it introduces overhead in maintaining data schemas and migrations that is not justified for our straightforward storage needs.
- **localStorage** Provides extensive storage capacity (typically 5-10MB), persists data across browser sessions, and has a straightforward API that is well-supported across modern browsers.
- **sessionStorage**: Similar to localStorage in terms of API and capacity, but data is cleared when the browser tab or window is closed. This would be suitable if we preferred ephemeral storage, but we want data to persist across sessions.
- **In-memory JavaScript objects**: Data is lost on page reload, making this approach unsuitable for a multi-step form where users might navigate away or refresh the page.
- **File storage (download/upload)**: Many SINA setups restrict file upload capabilities for security reasons, making this option impractical for our target users.

## Decision

We will use **localStorage** to persist user form data on the client since it persists data across browser sessions, does not send the data to the server and has a simple and straightforward API.

## Consequences

- **Data persistence**: User input is stored on the client's hard drive and remains available after closing and reopening the browser window or tab, improving user experience by preventing data loss.

- **Security measures**: We set proper Content-Security-Policy headers to prevent XSS attacks that could potentially access localStorage. We do not encrypt the data within localStorage itself, as SINA devices provide their own security measures (e.g., encrypted drives) to protect sensitive data at rest.

- **Data schema versioning**: We need to implement versioning of the data schema to handle cases where the application is updated with incompatible data structures. This allows us to invalidate or migrate stored data gracefully when the schema changes.

- **Storage limitations**: While localStorage provides adequate capacity for form data, we must be mindful of the storage limits and handle cases where storage might be full or unavailable.

- **Browser dependency**: Users must use the same browser and device to continue their work, as localStorage is scoped to the browser and domain.
