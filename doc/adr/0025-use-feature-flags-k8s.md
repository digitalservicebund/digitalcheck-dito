# 24. Use Kubernetes configMap to set feature flags

## Status

- 2025-11-24: Accepted

## Context

We require a mechanism to enable or disable features within our application, depending on which environment it runs in.
The goal is to minimize operational overhead while maintaining basic toggling functionality.

## Decision

We will use Kubernetes ConfigMaps as the mechanism for feature toggles. Each instance of the application will read its specific feature flag configuration from a mounted ConfigMap.

## Consequences

**Positive:**

- Zero Operational Overhead: No need to deploy, maintain, purchase, or scale an external service.
- Native Integration: Feature flags are managed as standard Kubernetes resources, aligning with existing deployment workflows.
- Simplicity: Minimal code complexity; services simply read a local file path or environment variable from the mounted ConfigMap.

**Negative:**

- No Centralized UI/Dashboard: Management requires direct interaction with JSON files, making it less accessible for non-engineering teams.
- Slower Activation: Toggling a flag requires a commit to Git, and change of the affected services, leading to slower activation times with more steps.
- Limited Capabilities: ConfigMaps only support simple boolean toggles or key-value settings. They lack advanced features like gradual rollouts, A/B testing, targeting based on user attributes, or built-in audit logging.

## Alternatives Considered

- **Continuing to use Unleash**: Our platform operations team wanted to reduce the number of services they managed. Therefore, we decided to discontinue using our self-hosted Unleash instance. Using a managed service seemed unnecessary given the limited requirements.
- **Using PostHog**: We considered using the PostHog feature flags service since we already use the suite for analytics. However, we rejected the option due to the lack of differentiation between environments (staging vs production).
