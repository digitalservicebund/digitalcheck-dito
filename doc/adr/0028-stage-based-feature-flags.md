# 28. Replace feature flags with staging-only features

## Status

- 2026-06-19: Accepted
- Supersedes [ADR 25](./0025-use-feature-flags-k8s.md) (Kubernetes ConfigMap flags), which superseded [ADR 11](./0011-use-feature-flags.md) (Unleash)

## Context

ADR 25 moved feature flags into Kubernetes ConfigMaps in the infrastructure repository. Every toggle required a change and deployment there, which caused more friction than it saved.

In practice, our flags were binary: all enabled in staging, all disabled in production. We never needed gradual rollouts, user targeting or runtime toggling. Since ADR 27 removed the application server, ConfigMaps can no longer be read at runtime anyway.

## Decision

We drop individual feature flags. Unfinished features are shown on staging and hidden in production, decided by the stage each build is made for (`PUBLIC_STAGE`).

Hiding a feature takes one line in code: an `isProduction` check, or `isStagingOnly: true` for whole pages. Releasing it means deleting that line.

## Consequences

- **Much simpler setup:** No flag definitions, config files, React context or infrastructure repository changes. Everything happens in this repository.
- **No per-flag or runtime control:** A feature is either staging-only or live. If finer control is ever needed, a dedicated flag service has to be reconsidered.
