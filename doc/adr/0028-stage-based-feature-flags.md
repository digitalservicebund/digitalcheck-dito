# 28. Replace ConfigMap feature flags with a build-time stage variable

## Status

- 2026-06-19: Proposed
- Supersedes [ADR 25](./0025-use-feature-flags-k8s.md) (Kubernetes ConfigMap flags), which superseded [ADR 11](./0011-use-feature-flags.md) (Unleash)

## Context

ADR 25 replaced Unleash with Kubernetes ConfigMaps to reduce operational overhead. In practice, maintaining flag definitions in a separate infrastructure repository and coordinating deployments there for every toggle introduced more friction than it saved.

More importantly, our actual flag usage turned out to be fully binary: all flags were enabled in staging, all flags were disabled in production. No gradual rollouts, user targeting, or per-flag runtime toggling were ever needed. ADR 27 (Astro SSG) additionally removed the runtime server, making ConfigMaps unreadable at runtime regardless.

## Decision

We will use `!isProduction` from `src/config/stage.ts` (derived from the `PUBLIC_STAGE` build-time environment variable) as the sole mechanism for conditional feature visibility.

## Consequences

- No infrastructure repository changes are needed to ship a feature to staging — the flag is gone once a feature reaches production.
- Zero operational overhead, no external dependencies, no separate config files.
- Runtime toggling and per-flag granularity are out of scope; if those needs arise, a dedicated service should be reconsidered.
- The Kubernetes ConfigMap flag files and related infra-repo configuration can be removed.
