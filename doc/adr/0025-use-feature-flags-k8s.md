# 24. Use Kubernetes configMap to set feature flags

## Status

- 2025-11-24: Accepted

## Context

We require a mechanism to enable or disable features within our application, depending on which environment it runs in.
The goal is to minimize operational overhead while maintaining basic toggling functionality.
We were asked to replace Unleash (from [ADR 11](./0011-use-feature-flags.md)) with a different solution to reduce the number of services the platform team has to manage.

## Decision

We will use Kubernetes ConfigMaps as the mechanism for feature toggles. Each instance of the application will read its specific feature flag configuration from a mounted ConfigMap.

## Consequences

**Positive:**

- **Zero Operational Overhead**: No need to deploy, maintain, purchase, or scale an external service.
- **Native Integration**: Feature flags are managed as standard Kubernetes resources, aligning with existing deployment workflows.
- **Simplicity**: Limited code complexity; services simply read a local file path or environment variable from the mounted ConfigMap.

**Negative:**

- **No Centralized UI/Dashboard**: Management requires direct interaction with JSON files, making it less accessible for non-engineering team members.
- **Slower Activation**: Toggling a flag requires a commit to Git, and change of the affected services and flags are also cached on multiple levels (kubernetes, node.js), both leading to slower activation times with more steps.
- **Implementation Complexity**: ConfigMaps are a simple key-value store, but we need to implement a way to load the flags into the application and handle caching ourselves.
- **Limited Capabilities**: ConfigMaps only support simple boolean toggles or key-value settings. They lack advanced features like gradual rollouts, A/B testing, targeting based on user attributes, or built-in audit logging.

## Alternatives Considered

- **Using PostHog**: We considered using the PostHog feature flags service since we already use the suite for analytics. However, because we can only setup one project with the free tier, we rejected the option due to the lack of differentiation between environments (staging vs production).
